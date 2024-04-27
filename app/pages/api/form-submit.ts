// pages/api/submit-form.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

// MySQL connection configuration
const connectionConfig = {
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      // Connect to the database
      const connection = await mysql.createConnection(connectionConfig);

      // Destructure the form data from the request body
      const { firstName, lastName, province, canton, barrio, isFirstVisit, previousConsultation, consultationReason, phoneNumber, patientId } = req.body;

      // Prepare the SQL query
      const query = 'INSERT INTO patients (firstName, lastName, province, canton, barrio, isFirstVisit, previousConsultation, consultationReason, phoneNumber, patientId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      
      // Execute the query
      const [result] = await connection.execute(query, [firstName, lastName, province, canton, barrio, isFirstVisit, previousConsultation, consultationReason, phoneNumber, patientId]);

      // Close the database connection
      await connection.end();

      // Send a success response
      res.status(200).json({ message: 'Form submitted successfully', result });
    } catch (error) {
      // Handle any errors
      res.status(500).json({ message: 'Error submitting form', error });
    }
  } else {
    // Handle any non-POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
