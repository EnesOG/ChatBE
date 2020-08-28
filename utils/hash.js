const bcrypt = require("bcryptjs");

const hashString = async (string) =>
  new Promise((resolve, reject) =>
    bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT), (err, salt) => {
      if (err) reject(err);
      bcrypt.hash(string, salt, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    })
  );

const hashCompare = async (storedHash, inputHash) =>
  new Promise((resolve, reject) =>
    bcrypt
      .compare(inputHash, storedHash)
      .then((boolean) =>
        boolean
          ? resolve(boolean)
          : reject({ error: "Je wachtwoord komt niet overeen" })
      )
      .catch((e) => reject(e))
  );

module.exports = { hashString, hashCompare };
