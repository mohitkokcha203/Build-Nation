const router = require("express").Router();

const authMiddleware = require("../MIDDELEWARES/authMiddleware");
const productControllers = require("../CONTROLLERS/productController");

router.post(
  "/create",
  authMiddleware,
  productControllers.createProductController
);

router.post(
  "/single",
  authMiddleware,
  productControllers.getSingleProductController
);

router.get("/all", authMiddleware, productControllers.getAllProductController);

router.put(
  "/update",
  authMiddleware,
  productControllers.updateProductController
);

router.delete(
  "/delete/:id",
  authMiddleware,
  productControllers.deleteProductController
);

module.exports = router;
