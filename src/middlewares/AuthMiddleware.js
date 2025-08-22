const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Acesso negado!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.name = decoded.name;
    req.userId = decoded._id;
    req.userName = decoded.userName;
    req.email = decoded.email;
    next();
    
  } catch (error) {
    res.status(401).json({ message: "Token invalido!" });
  }

};

module.exports = checkToken;
