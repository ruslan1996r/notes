const User = require('../models/User');

let auth = (req, res, next) => {
  const authHeader = req.headers.authorization || ""
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ error: "Not authorized" });
  }

  User.findByToken(token, (err, user) => {
    if (!user || err) return res.status(401).send({ error: "Authorization error", message: err });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };