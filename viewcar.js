const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const port = 3003;

app.use(express.json());
app.use(cors());

///// database connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "car_registration",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

///check the database connection
async function checkDatabaseConnection() {
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.log("Database Connection is established");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
}

//call the function to the database..
checkDatabaseConnection();

//api to view car owner..
app.get("/viewcars", async (req, res) => {
  try {
    ///get connection from the pool....
    const connection = await pool.getConnection();

    ///view data from the owner table ...
    const [result] = await connection.query(
      "SELECT * FROM Vehicle"
    );
    //release connection to the database..
    connection.release();

    res.status(200).json({ message: "View registered car's registerd", result });
  } catch (error) {
    console.error("Error in view car's registered ", error);
    res.status(500).json({ message: "Internal server Error" });
  }
});

///start the server and listen  for incoming requests..
app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});
