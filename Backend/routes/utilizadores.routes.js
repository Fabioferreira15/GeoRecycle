const express = require("express");
let router = express.Router();
const userController = require("../controllers/utilizadores.controller");
const authController = require("../controllers/auth.controller");

// middleware for all routes related with users
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

const multer = require("multer");
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const multerUpload = multer({ storage: storage }).single("image");
// ROUTES
router 
  .route("/")
  .get(authController.verifyToken,userController.getAllUsers)
router
  .route("/registo")
  .post(userController.create);
router
  .route("/login")
  .post(userController.login);
router
  .route("/:id")
  .patch(authController.verifyToken,userController.updateUserById)
  .get(authController.verifyToken,userController.getUser)
  .delete(authController.verifyToken,userController.deleteUser);

router
  .route("/:id/foto")
  .patch(multerUpload,authController.verifyToken,userController.updateUserPhotoById)
router
  .route("/:id/badges")
  .get(authController.verifyToken,userController.getBadgesUser)


router.all("*", function (req, res) {
  res.status(404).json({ message: "Users: what???" });
});
// EXPORT ROUTES (required by APP)
module.exports = router;
