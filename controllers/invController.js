const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

async function buildVehicleDetail(req, res, next) {
  try {
    const inv_id = parseInt(req.params.inv_id);
    const vehicle = await invModel.getVehicleById(inv_id);
    const nav = await utilities.getNav();
    const detailView = utilities.buildDetailView(vehicle);

    res.render("./inventory/detail", {
      title: `${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}`,
      nav,
      detailView,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { buildVehicleDetail };
