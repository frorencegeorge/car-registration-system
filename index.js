const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const port = 3002;

app.use(express.json());
app.use(cors());

// Database connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "car_registration",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Check database connection
async function checkDatabaseConnection() {
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.log("Database connection is established");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

// Call the checkDatabaseConnection function
checkDatabaseConnection();

// API endpoint to insert data into the Owner table
app.post("/insertOwner", async (req, res) => {
  try {
    const { first_name, last_name, address, phone_number, email } = req.body;

    // Get a connection from the pool
    const connection = await pool.getConnection();

    // Insert data into the Owner table
    const [result] = await connection.query(
      "INSERT INTO Owner (first_name, last_name, address, phone_number, email) VALUES (?, ?, ?, ?, ?)",
      [first_name, last_name, address, phone_number, email]
    );

    connection.release();

    res.status(201).json({ message: "Owner created successfully", result });
  } catch (error) {
    console.error("Error inserting data into Owner table:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start the server and listen for incoming requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
