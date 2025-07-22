// GET detail view of a vehicle by ID
const express = require("express");
const router = express.Router();
const invController = require("../controllers/invController");
// const utilities = require("../utilities");

// Route for classification views (e.g., /inventory/sedan)
router.get("/type/:classification_id", invController.buildClassificationView);

// Route for vehicle detail views (e.g., /inventory/detail/12)
router.get("/detail/:inventory_id", invController.buildVehicleDetail);

module.exports = router;
