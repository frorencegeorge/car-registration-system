    
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = 3005;

app.use(express.json());
app.use(cors());

// Database connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'car_registration',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Check database connection
async function checkDatabaseConnection() {
    try {
        const connection = await pool.getConnection();
        connection.release();
        console.log('Database connection is established');
    } catch (error) {
        console.error('Error connecting to the database: ', error);
    }
}

// Call the checkDatabaseConnection function
checkDatabaseConnection();

// Define maximum number of attempts
const MAX_ATTEMPTS = 1000;

// Generate a function to generate automatic plate number in ascending order
let lastGeneratedAlphabet = 'AAA'; // Start with 'AAA'
let lastGeneratedNumber = 0; // Start with 0

function generateRegistrationNumber(attempts = 0) {
    if (attempts >= MAX_ATTEMPTS) {
        throw new Error('Exceeded maximum number of attempts to generate a unique registration number');
    }
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lastIndex = alphabet.indexOf(lastGeneratedAlphabet[2]);
    if (lastIndex === alphabet.length - 1) {
        lastIndex = -1; // Reset to -1 to start from A again
    }
    lastGeneratedAlphabet = alphabet[lastIndex + 1] + lastGeneratedAlphabet[1] + lastGeneratedAlphabet[0];

    lastGeneratedNumber++;
    if (lastGeneratedNumber > 999) {
        lastGeneratedNumber = 0; // Reset to 0 if reached 999
    }
    const paddedNumber = lastGeneratedNumber.toString().padStart(3, '0');
    return `T${lastGeneratedAlphabet}${paddedNumber}`;
}

// API endpoint to insert data into the Vehicle table
app.post('/insertVehicle', async (req, res) => {
    try {
        const { make, model, year, color, owner_id } = req.body;
        let registration_number = await generateRegistrationNumber();
        const connection = await pool.getConnection();

        // Check if the generated registration number already exists in the database
        let existingVehicle = await connection.query('SELECT * FROM Vehicle WHERE registration_number = ?', [registration_number]);
        if (existingVehicle[0].length > 0) {
            // If registration number already exists, generate a new one until unique
            let attempts = 1;
            while (existingVehicle[0].length > 0 && attempts < MAX_ATTEMPTS) {
                registration_number = await generateRegistrationNumber();
                existingVehicle = await connection.query('SELECT * FROM Vehicle WHERE registration_number = ?', [registration_number]);
                attempts++;
            }
            if (attempts >= MAX_ATTEMPTS) {
                connection.release();
                return res.status(500).json({ message: 'Unable to generate a unique registration number' });
            }
        }

        // Insert the vehicle data into the database
        const [ownerResult] = await connection.query('SELECT * FROM Owner WHERE owner_id = ?', [owner_id]);
        if (ownerResult.length === 0) {
            connection.release();
            return res.status(404).json({ message: 'Owner not found' });
        }
        const [result] = await connection.query('INSERT INTO Vehicle (make, model, year, color, registration_number, owner_id) VALUES (?, ?, ?, ?, ?, ?)', [make, model, year, color, registration_number, owner_id]);
        connection.release();
        res.status(201).json({ message: 'Vehicle registered successfully', result });
    } catch (error) {
        console.error('Error inserting data into Vehicle table:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



// Start the server and listen for incoming requests
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});