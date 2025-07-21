// /database/index.js
const { Pool } = require("pg");
require("dotenv").config();

// Check if we're running locally (development) or online (production like Render)
const isDev = process.env.NODE_ENV === "development";

// Create the connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Initial DB connection test failed:", err);
  } else {
    console.log("✅ DB connection success:", res.rows);
  }
});

// Export the query function so it works the same everywhere
module.exports = {
  async query(text, params) {
    try {
      const result = await pool.query(text, params);
      if (isDev) {
        console.log("Executed query:", text);
      }
      return result;
    } catch (err) {
      console.error("Query error:", err);
      throw err;
    }
  },
};
