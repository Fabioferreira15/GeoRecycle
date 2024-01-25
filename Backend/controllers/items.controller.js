const db = require("../models");
const Items = db.items;
const User = db.users;
const config = require("../config/db.config.js");

//Ver todos os items da loja
exports.getStoreItemsAdmin = async (req, res) => {
  try {
    if (req.loggedUserType !== "admin")
      return res.status(403).json({
        success: false,
        msg: "Tem que estar autenticado como admin",
      });
    let items = await Items.find({});
    console.log(items);
    res.status(200).json({
      success: true,
      msg: "Items retornados com sucesso",
      items: items,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || "Algo correu mal, tente novamente mais tarde.",
    });
  }
};


//Ver todos os items da loja utilizador
exports.getStoreItemsUser = async (req, res) => {
  try {
    let items = await Items.find({},{nome:1,preco:1,foto:1,_id:1});
    res.status(200).json({
      success: true,
      msg: "Items retornados com sucesso",
      items: items,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || "Algo correu mal, tente novamente mais tarde.",
    });
  }
};


//APAGAR UM ITEM DA LOJA
exports.deleteItem = async (req, res) => {
  try {
    if (req.loggedUserType !== "admin")
      return res.status(403).json({
        success: false,
        msg: "Tem que estar autenticado como admin",
      });
    let item = await Items.findByIdAndDelete(req.params.id);
    if (!item)
      return res.status(404).json({
        success: false,
        msg: "Item não encontrado",
      });
    res.status(200).json({
      success: true,
      msg: "Item apagado com sucesso",
      item: item,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || "Algo correu mal, tente novamente mais tarde.",
    });
  }
}


//Modificar um item da loja
exports.updateItem = async (req, res) => {
  const {preco,stock} = req.body;
  try{
    if(req.loggedUserType !== "admin")
      return res.status(403).json({
        success: false,
        msg: "Tem que estar autenticado como admin"
      });
    let item = await Items.findById(req.params.id);
    if(!item)
      return res.status(404).json({
        success: false,
        msg: "Item não encontrado"
      });
    if(preco)
      item.preco = preco;
    if(stock)
      item.stock = stock;
    
    await item.save();
    res.status(200).json({
      success: true,
      msg: "Item atualizado com sucesso",
      item: item
    });

  } catch(err){
    res.status(500).json({
      success: false,
      msg: err.message
    });
  }
}
//fazer uma compra
exports.buyItem = async (req, res) => {
  try{
    let item = await Items.findById(req.params.id);
    if(!item)
      return res.status(404).json({
        success: false,
        msg: "Item não encontrado"
      });
    if(item.stock <= 0)
      return res.status(404).json({
        success: false,
        msg: "Item sem stock"
      });
    if(item){
      const user = await User.findById(req.loggedUserId);
      if(user.moedas < item.preco) {
        return res.status(404).json({
          success: false,
          msg: "Moedas insuficientes"
        });
      } else {
        user.moedas -= item.preco;
        item.stock -= 1;
        await user.save();
        await item.save();
      }
    }
    res.status(200).json({
      success: true,
      msg: "Item comprado com sucesso",
      item: item
    });

  } catch(err){
    res.status(500).json({
      success: false,
      msg: err.message
    });
  }
}