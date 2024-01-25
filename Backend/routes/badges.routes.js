const express = require("express");
let router = express.Router();
const BadgesController = require("../controllers/badges.controller.js");
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
    .get(authController.verifyToken, BadgesController.getAllBadges)

router
    .route("/:id")
    .patch(authController.verifyToken, BadgesController.editBadge)
    .delete(authController.verifyToken, BadgesController.deleteBadge);

router.all("*", function (req, res) {
    res.status(404).json({
        message: "Badge: what???"
    });
});
// EXPORT ROUTES (required by APP)
module.exports = router;