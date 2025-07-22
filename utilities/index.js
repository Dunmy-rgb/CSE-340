const invModel = require("../models/inventory-model");

const Util = {};

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function () {
  let data = await invModel.getClassifications(); // Now returns an array of rows
  let list = "<ul class='navigation'>";
  list += '<li><a href="/" title="Home page">Home</a></li>';
  data.forEach((row) => {
    list += `<li><a href="/inv/type/${row.classification_id}" title="See our inventory of ${row.name} vehicles">${row.name}</a></li>`;
  });
  list += "</ul>";
  return list;
};

/* ===========================
   Build Vehicle Grid for Classification View
=========================== */
Util.buildClassificationGrid = function (vehicles) {
  try {
    let grid;

    if (Array.isArray(vehicles) && vehicles.length > 0) {
      grid = '<ul id="inv-display">';
      vehicles.forEach((vehicle) => {
        grid += `
          <li>
            <a href="/inv/detail/${
              vehicle.inventory_id
            }" title="View details for ${vehicle.make} ${vehicle.model}">
              <img src="${vehicle.inv_thumbnail}" alt="Image of ${
          vehicle.make
        } ${vehicle.model}">
            </a>
            <div class="namePrice">
              <h2>
                <a href="/inv/detail/${
                  vehicle.inventory_id
                }" title="View details for ${vehicle.make} ${vehicle.model}">
                  ${vehicle.make} ${vehicle.model}
                </a>
              </h2>
              <span>$${parseFloat(vehicle.inv_price).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}</span>
            </div>
          </li>
        `;
      });
      grid += "</ul>";
    } else {
      grid =
        "<p class='notice'>Sorry, no matching vehicles could be found.</p>";
    }

    return grid;
  } catch (error) {
    console.error("Error building vehicle classification grid:", error);
    return "<p class='notice'>An error occurred while building the vehicle grid.</p>";
  }
};

/* ************************
 * Builds the vehicle detail HTML
 ************************** */
Util.buildDetailView = function (vehicle) {
  const priceFormatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(vehicle.inv_price);

  return `
    <section class="vehicle-detail">
      <img src="${vehicle.inv_image}" alt="Image of ${vehicle.make} ${vehicle.model}">
      <div class="vehicle-info">
        <h2>${vehicle.year} ${vehicle.make} ${vehicle.model}</h2>
        <p><strong>Price:</strong> ${priceFormatted}</p>
        <p><strong>Description:</strong> ${vehicle.inv_description}</p>
      </div>
    </section>
  `;
};

module.exports = Util;
