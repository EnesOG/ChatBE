const { body } = require("express-validator");
const { doesUserExist } = require("../Auth/custom");

const createValidation = () => {
  return [
    body("users").isArray(),
    body("users.*._id")
      .not()
      .isEmpty()
      .bail()
      .isMongoId()
      .bail()
      .custom((id) => doesUserExist(id)),
  ];
};

module.exports = {
  createValidation,
};
