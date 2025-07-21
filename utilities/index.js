const invModel = require("../models/inventory-model");
const Util = {};

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function () {
  let data = await invModel.getClassifications();
  let list = '<ul class="navigation">';
  list += "<li>Home</li>"; // no <a>
  data.rows.forEach((row) => {
    list += `<li>${row.name}</li>`; // no <a>
  });
  list += "</ul>";
  return list;
};

module.exports = Util;

function buildDetailView(vehicle) {
  const priceFormatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(vehicle.inv_price);

  const mileageFormatted = new Intl.NumberFormat("en-US").format(
    vehicle.inv_miles
  );

  return `
    <section class="vehicle-detail">
      <img src="${vehicle.inv_image}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model}">
      <div class="vehicle-info">
        <h2>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h2>
        <p><strong>Price:</strong> ${priceFormatted}</p>
        <p><strong>Mileage:</strong> ${mileageFormatted} miles</p>
        <p><strong>Color:</strong> ${vehicle.inv_color}</p>
        <p><strong>Description:</strong> ${vehicle.inv_description}</p>
      </div>
    </section>
  `;
}

module.exports = { ...existingExports, buildDetailView };
