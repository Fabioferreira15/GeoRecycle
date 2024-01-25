const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.URL;
db.mongoose
  .connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
db.users = require("./utilizadores.model.js")(mongoose);
db.ecopontos = require("./ecopontos.model.js")(mongoose);
db.utilizacaos = require("./utilizacao.model.js")(mongoose);
db.items = require("./items.model.js")(mongoose);
db.badges = require("./badges.model.js")(mongoose);
module.exports = db;
