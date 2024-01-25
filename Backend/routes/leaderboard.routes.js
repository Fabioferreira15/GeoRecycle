const express = require("express");
let router = express.Router();
const leaderboardController = require("../controllers/leaderboard.controller.js");
const authController = require("../controllers/auth.controller");

// middleware for all routes related with leaderboard
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
  .route("/pontos")
  .get(authController.verifyToken, leaderboardController.leaderboardByPoints);

router
    .route("/ecopontos")
    .get(authController.verifyToken, leaderboardController.leaderboardByEcopontos);

router.all("*", function (req, res) {
  res.status(404).json({ message: "Users: what???" });
});
// EXPORT ROUTES (required by APP)
module.exports = router;
