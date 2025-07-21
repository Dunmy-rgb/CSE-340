// GET detail view of a vehicle by ID
router.get("/detail/:inv_id", invController.buildVehicleDetail);
router.get("/error-test", (req, res, next) => {
  throw new Error("This is a test 500 error!");
});
