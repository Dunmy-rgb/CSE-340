/* ******************************************
 * This server.js file is the primary file of the
 * application. It is used to control the project.
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const env = require("dotenv").config();
const app = express();

const baseController = require("./controllers/baseController");
const static = require("./routes/static");
const utilities = require("./utilities"); // ⬅️ Added for error handling

/* ***********************
 * Express Static Files Setup ✅
 *************************/
app.use(express.static("public")); // ✅ Serves static files from /public

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout"); // Not at views root

/* ***********************
 * Routes
 *************************/
app.use(static);

/* ***********************
 * Index route
 *************************/
app.get("/", baseController.buildHome);

/* ***********************
 * Global Error Handling Middleware
 *************************/

// Catch 404 errors
app.use(async (req, res, next) => {
  const nav = await utilities.getNav();
  res.status(404).render("errors/404", {
    title: "404 - Page Not Found",
    nav,
  });
});

// Catch 500 errors
app.use(async (err, req, res, next) => {
  console.error(err.stack);
  const nav = await utilities.getNav();
  res.status(500).render("errors/500", {
    title: "Server Error",
    nav,
  });
});

/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT;
const host = process.env.HOST;

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`App listening on ${host}:${port}`);
});
