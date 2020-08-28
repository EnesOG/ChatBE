const jwt = require("jsonwebtoken");

const signToken = (object) => {
  // incase object has password prop that we dont want to send
  object.password = undefined;
  return new Promise((resolve, reject) =>
    jwt.sign(object.toJSON(), "secret", { expiresIn: "24h" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    })
  );
};

const verifyToken = (token) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, "secret", (err, user) => {
      if (err) reject(err);
      resolve(user);
    })
  );

module.exports = { signToken, verifyToken };
