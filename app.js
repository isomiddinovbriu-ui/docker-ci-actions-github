const express = require("express");
const pool = require("./db"); // Import the database pool
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const port = process.env.PORT ;

// Middleware to parse JSON bodies
app.use(express.json());

  
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
// A simple route to fetch data from the database
app.get("/users", async (req, res) => {
  try {
    // Perform a query using the pool
    const result = await pool.query("SELECT * FROM users ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// A route to add a new user
app.post("/users", async (req, res) => {
    const { name, email } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
            [name, email]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Database connected: ${pool.options.database}`);
  console.log(`Server url: http://localhost:${port}`);
});
