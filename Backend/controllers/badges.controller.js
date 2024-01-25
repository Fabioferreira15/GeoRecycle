const db = require("../models");
const Badges = db.badges;
const config = require("../config/db.config.js");

// rota para editar uma badge
exports.editBadge = async (req, res) => {
  try {
    if (req.loggedUserType !== "admin")
      return res.status(403).json({
        success: false,
        msg: "Tem que estar autenticado como admin",
      });
    let badge = await Badges.findByIdAndUpdate(
      req.params.id,
      {
        nome: req.body.nome,
        foto: req.body.foto,
      },
      { new: true }
    );
    if (!badge)
      return res.status(404).json({
        success: false,
        msg: "Badge não encontrada",
      });
    res.status(200).json({
      success: true,
      msg: "Badge atualizada com sucesso",
      badge: badge,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || "Algo correu mal, tente novamente mais tarde.",
    });
  }
};

// rota para eliminar uma badge
exports.deleteBadge = async (req, res) => {
  try {
    if (req.loggedUserType !== "admin")
      return res.status(403).json({
        success: false,
        msg: "Tem que estar autenticado como admin",
      });
    let badge = await Badges.findByIdAndDelete(req.params.id);
    if (!badge)
      return res.status(404).json({
        success: false,
        msg: "Badge não encontrada",
      });
    res.status(200).json({
      success: true,
      msg: "Badge eliminada com sucesso",
      badge: badge,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || "Algo correu mal, tente novamente mais tarde.",
    });
  }
};

//ver todas as badges
exports.getAllBadges = async (req, res) => {
  try {
    if (req.loggedUserType !== "admin")
      return res.status(403).json({
        success: false,
        msg: "Tem que estar autenticado como admin",
      });
    let badges = await Badges.find();
    if (!badges)
      return res.status(404).json({
        success: false,
        msg: "Não há badges",
      });
    res.status(200).json({
      success: true,
      msg: "Badges encontradas",
      badges: badges,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || "Algo correu mal, tente novamente mais tarde.",
    });
  }
};
