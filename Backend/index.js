require("dotenv").config(); // read environment variables from .env file
const express = require("express");
const cors = require("cors"); // middleware to enable CORS (Cross-Origin Resource Sharing)
const app = express();
const port = process.env.PORT; // use environment variables
const host = process.env.HOST;
app.use(cors()); //enable ALL CORS requests (client requests from other domain)
app.use(express.json()); //enable parsing JSON body data
// root route -- /api/
app.get("/", function (req, res) {
  res.status(200).json({ message: "GeoRecycle API" });
});
// routing middleware for resource Users
app.use('/utilizadores', require('./routes/utilizadores.routes.js'))
app.use('/ecopontos', require('./routes/ecopontos.routes.js'))
app.use('/leaderboard', require('./routes/leaderboard.routes.js'))
app.use('/utilizacao', require('./routes/utilizacao.routes.js'))
app.use('/loja', require('./routes/items.routes.js'))
app.use('/badges', require('./routes/badges.routes.js'))
app.get("*", function (req, res) {
  res.status(404).json({ message: "WHAT???" });
});
const server = app.listen(port,  () =>
  console.log(`App listening at http://${host}:${port}/`)
);

module.exports = { app, server };