const invModel = require("../models/inventory-model");
const utilities = require("../utilities");

/* ===========================
   Build Vehicle Detail View
=========================== */
async function buildVehicleDetail(req, res, next) {
  try {
    const vehicle = await invModel.getVehicleById(req.params.inventory_id);
    const detail = utilities.buildDetailView(vehicle);
    const nav = await utilities.getNav();
    const title = `${vehicle.inv_make} ${vehicle.inv_model}`;

    res.render("./inventory/detail", {
      title,
      nav,
      detail,
    });
  } catch (error) {
    next(error);
  }
}

/* ===========================
   Build Classification Grid View
=========================== */
async function buildClassificationView(req, res, next) {
  try {
    const classification_id = parseInt(req.params.classification_id);
    console.log("Received classification_id:", classification_id);

    const data =
      (await invModel.getInventoryByClassification(classification_id)) || [];
    console.log("Returned inventory:", data);

    const grid = utilities.buildClassificationGrid(data);
    const nav = await utilities.getNav();

    const title =
      data.length > 0
        ? `${data[0].classification_name} Vehicles`
        : "Vehicle Listing";

    res.render("./inventory/classification", {
      title,
      nav,
      grid,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  buildVehicleDetail,
  buildClassificationView,
};
