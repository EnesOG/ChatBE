const { verifyToken } = require("../utils/jwt");

const verifyUser = () => (req, res, next) => {
  const header = req.headers["authorization"];
  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const bearertoken = bearer[1];
    req.token = bearertoken;
    verifyToken(req.token)
      .then((user) => {
        req.user = user;
        next();
      })
      .catch((e) => res.sendStatus(403));
  } else {
    res.sendStatus(403);
  }
};

module.exports = {
  verifyUser,
};
