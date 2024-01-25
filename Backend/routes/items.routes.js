const express = require("express");
let router = express.Router();
const lojaController = require("../controllers/items.controller.js");
const authController = require("../controllers/auth.controller.js");

// middleware for all routes related with the store
router.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    // finish event is emitted once the response is sent to the client
    const diffSeconds = (Date.now() - start) / 1000; // figure out how many seconds elapsed
    console.log(
      `${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`
    );
  });
  next();
});
// ROUTES
router
  .route("/")
  .get(authController.verifyToken, lojaController.getStoreItemsUser);
router
  .route("/admin")
  .get(authController.verifyToken, lojaController.getStoreItemsAdmin);
router
  .route("/:id")
  .delete(authController.verifyToken, lojaController.deleteItem)
  .patch(authController.verifyToken, lojaController.updateItem);
router
  .route("/comprar/:id")
  .post(authController.verifyToken, lojaController.buyItem);

router.all("*", function (req, res) {
  res.status(404).json({ message: "Loja: what???" });
});
// EXPORT ROUTES (required by APP)
module.exports = router;
