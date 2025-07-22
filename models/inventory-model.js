const pool = require("../database");

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications() {
  try {
    const result = await pool.query(
      "SELECT * FROM classification ORDER BY name"
    );
    return result.rows;
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
    const result = await pool.query(
      "SELECT * FROM inventory WHERE inventory_id = $1",
      [inv_id]
    );
    return result.rows[0]; // ← Only use this result
  } catch (error) {
    console.error(`Error fetching vehicle with ID ${inv_id}:`, error);
    throw error;
  }
}

/* ===========================
   Get Inventory by Classification ID
=========================== */
async function getInventoryByClassification(classification_id) {
  try {
    const sql = `
      SELECT
        i.*,
        c.name AS classification_name
      FROM inventory i
      JOIN classification c
        ON i.classification_id = c.classification_id
      WHERE i.classification_id = $1
    `;
    const result = await pool.query(sql, [classification_id]);

    console.log("Returned inventory:", result.rows);

    return result.rows;
  } catch (error) {
    console.error(
      `Error fetching inventory for classification ID ${classification_id}:`,
      error
    );
    throw error;
  }
}

module.exports = {
  getClassifications,
  getVehicleById,
  getInventoryByClassification,
};
