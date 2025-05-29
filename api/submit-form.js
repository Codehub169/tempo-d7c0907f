import { addContactMessage } from './db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    // Basic email format validation (can be more robust)
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Store in database
    const result = await addContactMessage(name, email, message);
    
    return res.status(201).json({ message: 'Message submitted successfully!', id: result.id });

  } catch (error) {
    console.error('Error submitting form:', error);
    // Check if it's a database specific error, e.g. unique constraint (if any)
    // For now, a generic server error
    return res.status(500).json({ message: 'Internal Server Error. Could not submit message.' });
  }
}
