const mongoose = require("mongoose");
const User = mongoose.model("User");

const isEmailTaken = (email) =>
  User.findByEmail(email).then((user) => {
    if (user) {
      return Promise.reject("Dit e-mailadres is al in gebruik!");
    }
  });

const doesEmailExist = (email) =>
  User.findByEmail(email).then((user) => {
    if (!user) {
      return Promise.reject(
        "We kunnen geen account vinden met dit e-mailadres!"
      );
    }
  });

const doesUserExist = (id) =>
  User.findById(id).then((user) => {
    if (!user) {
      return Promise.reject("Gebruiker bestaat niet");
    }
  });

module.exports = {
  doesEmailExist,
  doesUserExist,
  isEmailTaken,
};
