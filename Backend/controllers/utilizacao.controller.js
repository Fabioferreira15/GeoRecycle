const db = require("../models");
const Utilizacao = db.utilizacaos;
const User = db.users;
const Ecoponto = db.ecopontos;
const config = require("../config/db.config.js");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});





exports.registarUtilizacao = async (req, res) => {
  try {
    let idEcoponto = req.params.id;
    if (!idEcoponto) {
      return res.status(400).json({
        success: false,
        error: "Indique o id do ecoponto.",
      });
    }

    let utilizacao_image = null;
    if (req.file) {
      utilizacao_image = await cloudinary.uploader.upload(req.file.path, {
        folder: "utilizacoes",
        crop: "scale",
      });
    } else{
      return res.status(400).json({
        success: false,
        error: "Indique uma foto.",
      });
    }

    let newUtilizacao = new Utilizacao({
      idUser: req.body.idUser,
      idEcoponto: idEcoponto,
      foto: utilizacao_image.secure_url,
      data: Date.now(),
    });
    await newUtilizacao.save();

    res.status(200).json({
      success: true,
      msg: 'Utilização registada com sucesso.',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || "Algo correu mal, tente novamente mais tarde.",
    });
  }
};

// Rota validar utilização
exports.validarUtilizacao = async (req, res) => {
  try {
    if (req.loggedUserType !== "admin")
      return res.status(401).json({
        success: false,
        msg: "Tem que estar autenticado como admin",
      });

    let idUtilizacao = req.params.id;
    if (!idUtilizacao) {
      return res.status(400).json({
        success: false,
        error: "Indique um id de utilização.",
      });
    }

    if (!req.body.utilizacaoAprovada) {
      //apagar utilização
      const utilizacao = await Utilizacao.findByIdAndDelete(idUtilizacao);
        if(utilizacao.foto){
          let public_id = utilizacao.foto.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(public_id);
        }
      return res.status(200).json({
        success: true,
        msg: "Utilização apagada com sucesso ",
      });
    }

    let utilizacao = await Utilizacao.findById(idUtilizacao);
    if (!utilizacao) {
      return res.status(404).json({
        success: false,
        error: "Utilização não encontrada.",
      });
    } else if (utilizacao.vistoAdmin) {
      return res.status(400).json({
        success: false,
        error: "Utilização já foi validada.",
      });
    } 

    utilizacao.vistoAdmin = true;
    utilizacao.utilizacaoAprovada = req.body.utilizacaoAprovada;
    await utilizacao.save();

    if (utilizacao.utilizacaoAprovada) {
      const ecoponto = await Ecoponto.findById(utilizacao.idEcoponto);
      const user = await User.findById(utilizacao.idUser);
      if (user && ecoponto) {
        user.pontos += 300;
        user.moedas += 1000;
        user.numUsoEcopontos += 1;
        ecoponto.utilizacoes += 1;
        
        if (user.numUsoEcopontos >= 10 && !user.badges.includes("6453da2688725a0e466c1064")) {
          user.badges.push("6453da2688725a0e466c1064");
        }
        if (user.numUsoEcopontos >= 25 && !user.badges.includes("6470b434dd9dfe2550462a30")) {
          user.badges.push("6470b434dd9dfe2550462a30");
        }
        if (user.numUsoEcopontos >= 50 && !user.badges.includes("647d0218303c655af719c5f9")) {
          user.badges.push("647d0218303c655af719c5f9");
        }
        
        await user.save();
        await ecoponto.save();
      }
    }
    res.status(200).json({
      success: true,
      msg: "Utilização validada com sucesso.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || "Algo correu mal, tente novamente mais tarde.",
    });
  }
};

// ver utilizações por veirificar
exports.getUtilizacoesPendentes = async (req, res) => {
  try {
    if (req.loggedUserType !== "admin")
      return res.status(401).json({
        success: false,
        msg: "Tem que estar autenticado como admin",
      });
    let utilizacoes = await Utilizacao.find({ vistoAdmin: false });

    if (utilizacoes.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Não existe nenhuma utilização por verificar!",
      });
    }
    res.status(200).json({
      success: true,
      utilizacoes: utilizacoes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || "Algo correu mal, tente novamente mais tarde.",
    });
  }
};

exports.getUtilizaçoesByUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.idUser);
    let utilizacoes = await Utilizacao.find(
      {
        idUser: user,
        vistoAdmin: true,
        utilizacaoAprovada: true,
      },
      { foto: 1, _id: 0 }
    );
    if (req.loggedUserId !== req.params.idUser) {
      return res.status(403).json({
        success: false,
        msg: "Não tenho premissão para ver estas utilizações.",
      });
    }
    if (utilizacoes.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Não existe nenhuma utilização!",
      });
    }
    res.status(200).json({
      success: true,
      utilizacoes: utilizacoes,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || "Algo correu mal, tente novamente mais tarde.",
    });
  }
};
