const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const port = 3007;

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

///check for connection..
async function checkDatabaseConnection() {
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.log("Database connection is established");
  } catch (error) {
    console.error("error connecting to the database ", error);
  }
}

///call the function to the database....
checkDatabaseConnection();

///api enpoint to search data from two tables by use  car registration number
app.get("/viewDetails/:registrationNumber", async (req, res) => {
  try {
    const registrationNumber = req.params.registrationNumber;

    // Query to retrieve details from both tables based on registration number
    const [vehicleResult] = await pool.query(
      `SELECT Vehicle.*, Owner.first_name, Owner.last_name, Owner.address, Owner.phone_number, Owner.email 
        FROM Vehicle 
        JOIN Owner ON Vehicle.owner_id = Owner.owner_id 
        WHERE Vehicle.registration_number = ?`,
      [registrationNumber]
    );

    if (vehicleResult.length === 0) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.status(200).json({
      message: "Details retrieved successfully",
      result: vehicleResult[0],
    });
  } catch (error) {
    console.error("Error retrieving details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});
