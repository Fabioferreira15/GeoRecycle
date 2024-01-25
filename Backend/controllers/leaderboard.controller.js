const db = require("../models");
const Utilizadores = db.users;
const config = require("../config/db.config.js");

//leaderboard por pontos - /leaderboard/pontos?limit=10
exports.leaderboardByPoints = async (req, res) => {
  try {
    let limit = parseInt(req.query.limit);
    if (!limit) limit = 10;
    let users = await Utilizadores.find({}, { nome: 1, pontos: 1, _id: 0 })
      .sort({ pontos: -1 })
      .limit(limit);
    res.status(200).json({
      success: "Utilizadores retornados com sucesso",
      leaderboard: users,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Algo correu mal, tente novamente mais tarde ",
    });
  }
};

//leaderboard por ecopontos usados - /leaderboard/ecopontos?limit=10
exports.leaderboardByEcopontos = async (req, res) => {
  try {
    let limit = parseInt(req.query.limit);
    if (!limit) limit = 10;
    let users = await Utilizadores.find(
      {},
      { nome: 1, numUsoEcopontos: 1, _id: 0 }
    )
      .sort({ numUsoEcopontos: -1 })
      .limit(limit);
    res.status(200).json({
      success: "Utilizadores retornados com sucesso",
      leaderboard: users,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Algo correu mal, tente novamente mais tarde. ",
    });
  }
};
