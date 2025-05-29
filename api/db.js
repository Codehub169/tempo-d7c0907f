import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';

const dataDirName = 'data';
const dbFileName = 'hueneu.sqlite';
let dbPath;

// Determine database path based on environment
if (process.env.VERCEL_ENV && ['production', 'preview'].includes(process.env.VERCEL_ENV)) {
  // For Vercel production/preview, use /tmp directory (writable, ephemeral)
  dbPath = path.join('/tmp', dbFileName);
  console.log(`Vercel environment (${process.env.VERCEL_ENV}) detected. Using SQLite database at: ${dbPath}`);
} else {
  // For local development (including `vercel dev`) or other environments
  const localDataDir = path.join(process.cwd(), dataDirName);
  // Ensure the local data directory exists
  if (!fs.existsSync(localDataDir)) {
    try {
      fs.mkdirSync(localDataDir, { recursive: true });
      console.log(`Created local data directory: ${localDataDir}`);
    } catch (mkdirErr) {
      console.error(`Error creating local data directory ${localDataDir}:`, mkdirErr);
      // If directory creation fails, subsequent DB operations will likely fail.
    }
  }
  dbPath = path.join(localDataDir, dbFileName);
  console.log(`Local/Dev environment detected. Using SQLite database at: ${dbPath}`);
}

let dbInitializationPromise = null;

const performDbInitialization = () => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
      if (err) {
        console.error('DB Init: Error opening/creating database file:', err.message, 'at path:', dbPath);
        return reject(new Error(`Failed to open/create database at ${dbPath}: ${err.message}`));
      }
      console.log('DB Init: Connected to the hueneu SQLite database.');
      
      const createTableSql = `
        CREATE TABLE IF NOT EXISTS contacts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          message TEXT NOT NULL,
          submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `;
      
      db.run(createTableSql, (tableErr) => {
        db.close((closeErr) => {
          if (closeErr) {
            console.error('DB Init: Error closing db connection after table check/creation:', closeErr.message);
          }
        });

        if (tableErr) {
          console.error('DB Init: Error creating contacts table:', tableErr.message);
          return reject(new Error(`Failed to create contacts table: ${tableErr.message}`));
        }
        
        console.log('DB Init: Contacts table checked/created successfully.');
        resolve();
      });
    });
  });
};

const getDbInitializationPromise = () => {
  if (!dbInitializationPromise) {
    dbInitializationPromise = performDbInitialization();
  }
  return dbInitializationPromise;
};

// Proactively initialize DB when module loads. 
// Errors here are logged for early detection during deployment/startup.
getDbInitializationPromise().catch(initError => {
  console.error("CRITICAL: Database initialization failed on module load.", initError);
});

/**
 * Adds a new contact message to the database.
 * @param {string} name - The sender's name.
 * @param {string} email - The sender's email.
 * @param {string} message - The message content.
 * @returns {Promise<{id: number}>} A promise that resolves with the ID of the new row.
 */
export const addContactMessage = async (name, email, message) => {
  try {
    await getDbInitializationPromise(); // Ensure DB schema is ready
  } catch (initError) {
    console.error('addContactMessage: DB initialization failed, cannot proceed.', initError);
    throw new Error(`Database not initialized, cannot add contact: ${initError.message}`);
  }

  return new Promise((resolve, reject) => {
    // Open a new connection (or create DB file if missing) for each operation.
    // This is generally safer for serverless environments.
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (connectErr) => {
      if (connectErr) {
        console.error('addContactMessage: DB Connection Error:', connectErr.message, 'at path:', dbPath);
        return reject(new Error(`Failed to connect to database for insert: ${connectErr.message}`));
      }
    });

    const sql = `INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`;
    
    db.run(sql, [name, email, message], function(runErr) { // Use function() for this.lastID
      const lastID = this ? this.lastID : null;

      db.close((closeErr) => {
        if (closeErr) {
          // Log warning, but don't fail the operation if insert was successful
          console.warn('addContactMessage: Warning: DB Close Error after insert attempt:', closeErr.message);
        }
      });

      if (runErr) {
        console.error('addContactMessage: DB Insert Error:', runErr.message);
        return reject(new Error(`Failed to insert contact: ${runErr.message}`));
      }
      
      if (lastID === null || lastID === undefined) {
        // This case should not happen if AUTOINCREMENT PK and insert was truly successful.
        console.error('addContactMessage: Insert reported success but lastID is not available.');
        return reject(new Error('Insert succeeded but failed to retrieve ID.'));
      }

      console.log(`addContactMessage: A row has been inserted with rowid ${lastID}`);
      resolve({ id: lastID });
    });
  });
};
