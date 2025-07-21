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
