const db = require("../models");
const User = db.users;
const Badges = db.badges;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config/db.config.js");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

// CRIAR CONTA
exports.create = async (req, res) => {
  const referalPoints = 100;
  const referalCoins = 100;
  let referralCode;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  while (!referralCode) {
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const existingUser = await User.findOne({
      referral: code,
    }).exec();
    if (!existingUser) {
      referralCode = code;
    }
  }

  const user = new User({
    nome: req.body.nome,
    password: bcrypt.hashSync(req.body.password, 10),
    confirmPassword: req.body.confirmPassword,
    foto:"https://res.cloudinary.com/djoiers7m/image/upload/v1686772842/ProfilePictures/avatar2_vuzqiw.png",
    email: req.body.email,
    referral: referralCode,
    referredBy: req.body.referredBy,
  });
  console.log(req.body.referredBy);
  if (!req.body.confirmPassword) {
    res.status(400).json({
      success: false,
      message: "Indique uma confirmação da palavra-passe",
    });
    return;
  }

  if (req.body.password !== req.body.confirmPassword) {
    res.status(400).json({
      success: false,
      message:
        "A palavra-passe e a confirmação da palavra-passe não são iguais",
    });
    return;
  }

  try {
    let newUser = await user.save();
    if (newUser.referredBy) {
      const referringUser = await User.findOne({
        referral: newUser.referredBy,
      }).exec();
      if (referringUser) {
        referringUser.pontos += referalPoints;
        referringUser.moedas += referalCoins;
        await referringUser.save();
        newUser.pontos += referalPoints;
        newUser.moedas += referalCoins;
        await newUser.save();
      }
    }
    res.status(201).json({
      sucess: true,
      message: "Utilizador criado com sucesso",
      URL: "/utilizadores/" + newUser._id,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      let errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      // Verificar se o nome de utilizador foi fornecido
      if (!req.body.nome) {
        errors["nome"] = "Indique um nome de utilizador";
      }
      // Verificar se a senha foi fornecida
      if (!req.body.password) {
        errors["password"] = "Indique uma palavra-passe";
      }

      // Verificar se o email foi fornecido
      if (!req.body.email) {
        errors["email"] = "Indique um email";
      }
      const existingUser = await User.findOne({
        email: req.body.email,
      }).exec();
      if (existingUser) {
        errors["email duplicado"] = "Email já existe";
      }
      res.status(400).json({
        success: false,
        message: errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || "Algo correu mal, tente novamente mais tarde.",
      });
    }
  }
};

// ROTA FAZER LOGIN
exports.login = async (req, res) => {
  try {
    if (!req.body || !req.body.nome || !req.body.password)
      return res.status(400).json({
        success: false,
        message: "Tens de fornecer o nome e a password",
      });

    let user = await User.findOne({
      nome: req.body.nome,
    }).exec();
    if (!user)
      return res.status(404).json({
        success: false,
        message: "Utilizador não encontrado",
      });

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid)
      return res.status(401).json({
        success: false,
        acessToken: null,
        message: "Password inválida",
      });

    const token = jwt.sign(
      {
        id: user._id,
        tipo: user.tipo,
      },
      config.SECRET,
      {
        expiresIn: "24h",
      }
    );
    return res.status(200).json({
      success: true,
      accessToken: token,
      message: "Login efetuado com sucesso",
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      let errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      res.status(400).json({
        success: false,
        message: errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || "Algo correu mal, tente novamente mais tarde.",
      });
    }
  }
};

// ROTA PARA VER TODOS OS UTILIZADORES
exports.getAllUsers = async (req, res) => {
  try {
    if (req.loggedUserType !== "admin")
      return res.status(403).json({
        success: false,
        msg: "Tem que estar autenticado como admin",
      });
    let users = await User.find({}, "-password");
    res.status(200).json({
      success: true,
      users: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || "Algo correu mal, tente novamente mais tarde.",
    });
  }
};

// ROTA UPDATE DO USER POR ID
exports.updateUserById = async (req, res) => {
  const userId = req.params.id;
  const { password, confirmPassword, biografia } = req.body;

  // Verifica se o ID do utilizador na solicitação corresponde ao ID do utilizador autenticado
  if (userId !== req.loggedUserId) {
    return res.status(403).json({ message: "Não autorizado" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilizador não encontrado!" });
    }

    //verificar se a password e confirmar sao iguais, verificar se a password é igual a antiga, se tudo estiver bem altera a password
    if (password && confirmPassword) {
      if (password === confirmPassword) {
        if (bcrypt.compareSync(password, user.password)) {
          return res
            .status(400)
            .json({ message: "A nova password não pode ser igual à antiga!" });
        } else {
          user.password = bcrypt.hashSync(password, 10);
        }
      } else {
        return res.status(400).json({ message: "As passwords não coincidem!" });
      }
    } else if (password && !confirmPassword) {
      return res.status(400).json({ message: "Confirme a password!" });
    } else if (!password && confirmPassword) {
      return res.status(400).json({ message: "Indique a password!" });
    }

    if (biografia) {
      user.biografia = biografia;
    }
    await user.save();
    res.status(200).json({ message: "Utilizador atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Rota para atualizar foto de perfil
exports.updateUserPhotoById = async (req, res) => {
  const userId = req.params.id;

  // Verifica se o ID do utilizador na solicitação corresponde ao ID do utilizador autenticado
  if (userId !== req.loggedUserId) {
    return res.status(403).json({ message: "Não autorizado" });
  }

  try{
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilizador não encontrado!" });
    }


    let user_image = null;
    if (req.file) {
      user_image = await cloudinary.uploader.upload(req.file.path, {
        folder: "ProfilePictures",
        crop: "scale",
      });
      user.foto = user_image.secure_url;
    } else{
      return res.status(400).json({ message: "Indique uma foto!" });
    }
    await user.save();
    res.status(200).json({ message: "Foto de perfil atualizada com sucesso!" });


  } catch (error){
    res.status(500).json({ message: err.message });

  }
  
}

// ROTA PARA VER UM UTILIZADOR POR ID
exports.getUser = async (req, res) => {
  try {
    if (req.loggedUserId !== req.params.id && req.loggedUserType)
      return res.status(403).json({
        success: false,
        msg: "Não tenho premissão para ver este utilizador.",
      });
    let user = await User.findById(req.params.id, "-password");
    if (!user)
      return res.status(404).json({
        success: false,
        msg: "Utilizador não encontrado",
      });
    //calcular novo nivel
    let newLevel = Math.floor(user.pontos / 1000);
    user.nivel = newLevel;
    await user.save();
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || "Algo correu mal, tente novamente mais tarde.",
    });
  }
};

// ROTA PARA APAGAR UM UTILIZADOR POR ID
exports.deleteUser = async (req, res) => {
  try {
    if (req.loggedUserType !== "admin")
      return res.status(403).json({
        success: false,
        msg: "Tem que estar autenticado como admin",
      });
    let user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res.status(404).json({
        success: false,
        msg: "Este utilizador não existe",
      });
    res.status(200).json({
      success: true,
      msg: "Utilizador apagado com sucesso",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || "Algo correu mal, tente novamente mais tarde.",
    });
  }
};

// rota ver badges do userLoggado
exports.getBadgesUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (req.loggedUserId !== req.params.id && req.loggedUserType)
      return res.status(403).json({
        success: false,
        msg: "Não tenho premissão para ver este utilizador.",
      });
    let badgeIds = user.badges;
    if (!badgeIds || badgeIds.length === 0)
      return res.status(404).json({
        success: false,
        msg: "User não tem badges",
      });
    let badges = await Badges.find({ _id: { $in: badgeIds } });
    let badgePhotos = badges.map((badge) => badge.foto);
    res.status(200).json({
      success: true,
      msg: "Badges encontradas",
      badges: badgePhotos,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || "Algo correu mal, tente novamente mais tarde.",
    });
  }
};