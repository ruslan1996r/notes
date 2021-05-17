const User = require('../models/User');

let auth = (req, res, next) => {
  const authHeader = req.headers.authorization || ""
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ error: "Не авторизован" });
  }

  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.status(401).send({ error: "Ошибка авторизации" });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };