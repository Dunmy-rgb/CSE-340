const pool = require("../database");

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications() {
  try {
    const result = await pool.query(
      "SELECT * FROM public.classification ORDER BY name"
    );
    return result;
  } catch (error) {
    console.error("Error fetching classifications:", error);
    throw error;
  }
}

/* ***************************
 *  Get a vehicle by ID
 * ************************** */
async function getVehicleById(inv_id) {
  try {
    const sql = "SELECT * FROM inventory WHERE inventory_id = $1";
    const result = await pool.query(sql, [inv_id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching vehicle by ID:", error);
    throw error;
  }
}

module.exports = {
  getClassifications,
  getVehicleById,
};
