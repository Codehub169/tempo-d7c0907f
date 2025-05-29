import sqlite3 from 'sqlite3';
import path from 'path';

// Determine the database path. For Vercel, process.cwd() is the project root.
const dbPath = path.join(process.cwd(), 'data', 'hueneu.sqlite');

// Initialize the database and create table if it doesn't exist.
// This function is self-invoking to ensure the table is ready.
(function initializeDb() {
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      console.error('Error opening/creating database:', err.message);
      return;
    }
    console.log('Connected to the hueneu SQLite database.');
    
    db.run(`CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) {
        console.error('Error creating contacts table:', err.message);
      } else {
        console.log('Contacts table checked/created successfully.');
      }
      db.close((err) => {
        if (err) {
          console.error('Error closing db connection during init:', err.message);
        }
      });
    });
  });
})();

/**
 * Adds a new contact message to the database.
 * @param {string} name - The sender's name.
 * @param {string} email - The sender's email.
 * @param {string} message - The message content.
 * @returns {Promise<{id: number}>} A promise that resolves with the ID of the new row.
 */
export const addContactMessage = (name, email, message) => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('DB Connection Error on addContactMessage:', err.message);
        return reject(err);
      }
    });

    const sql = `INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)`;
    
    // using function() {} to access `this.lastID`
    db.run(sql, [name, email, message], function(err) {
      if (err) {
        console.error('DB Insert Error:', err.message);
        db.close();
        return reject(err);
      }
      console.log(`A row has been inserted with rowid ${this.lastID}`);
      db.close((closeErr) => {
        if (closeErr) {
          console.error('DB Close Error after insert:', closeErr.message);
          // Still resolve with ID as insert was successful before close error
        }
      });
      resolve({ id: this.lastID });
    });
  });
};
