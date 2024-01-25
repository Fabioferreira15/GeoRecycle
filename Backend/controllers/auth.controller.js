const jwt = require("jsonwebtoken");
const config = require("../config/db.config.js");



exports.verifyToken = (req, res, next) => {
    const header = req.headers['x-access-token'] || req.headers.authorization;
    if (typeof header == 'undefined')
        return res.status(401).json({ success: false, message: "Token não fornecido" });
    
    const bearer = header.split(' ');
    const token = bearer[1];

    try {
        let decoded = jwt.verify(token, config.SECRET);
        req.loggedUserId = decoded.id;
        req.loggedUserType = decoded.tipo;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Sem autorização" });
    }
};