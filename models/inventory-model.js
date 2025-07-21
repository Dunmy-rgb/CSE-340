const db = require("../database"); // ✅ Correct import

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications() {
  const result = await db.query(
    "SELECT * FROM public.classification ORDER BY name"
  );
  return result.rows;
}

/* ***************************
 *  Get a vehicle by ID
 * ************************** */
async function getVehicleById(inv_id) {
  const sql = "SELECT * FROM inventory WHERE inv_id = $1";
  const result = await db.query(sql, [inv_id]); // ✅ use db.query
  return result.rows[0];
}

module.exports = {
  getClassifications,
  getVehicleById,
};
