const express = require("express");

const utilizacaoController = require("../controllers/utilizacao.controller");
const authController = require("../controllers/auth.controller");





let router = express.Router();
// middleware for all routes related with utilizacao
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
    .route("/pendentes")
    .get(authController.verifyToken, utilizacaoController.getUtilizacoesPendentes) 
router
    .route("/:id")
    .post(multerUpload,authController.verifyToken, utilizacaoController.registarUtilizacao)
    .put(authController.verifyToken, utilizacaoController.validarUtilizacao)
router
    .route("/:idUser")
    .get(authController.verifyToken, utilizacaoController.getUtilizaçoesByUser)

router.all("*", function (req, res) {
  res.status(404).json({ message: "Users: what???" });
});
// EXPORT ROUTES (required by APP)
module.exports = router;
