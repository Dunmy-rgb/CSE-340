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
