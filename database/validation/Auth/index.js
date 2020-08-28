const { body } = require("express-validator");
const { isEmailTaken, doesEmailExist } = require("./custom");

const createValidation = () => {
  return [
    body("email")
      .bail()
      .isEmail()
      .custom((email) => isEmailTaken(email)),
    body("first_name").isString(),
    body("last_name").isString(),
    body("password").notEmpty().isLength({ min: 5 }),
  ];
};

const loginValidation = () => {
  return [
    body("email")
      .isEmail()
      .bail()
      .custom((email) => doesEmailExist(email)),
    body("password").isLength({ min: 5 }),
  ];
};

module.exports = {
  createValidation,
  loginValidation,
};
