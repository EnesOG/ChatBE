const { body } = require("express-validator");
const { doesUserExist } = require("../Auth/custom");
const { doesConversationExist } = require("../Conversation/custom");

const createValidation = () => {
  return [
    body("message").isString(),
    body("conversation")
      .isMongoId()
      .bail()
      .custom((id) => doesConversationExist(id)),
    body("user")
      .isMongoId()
      .bail()
      .custom((id) => doesUserExist(id)),
  ];
};

module.exports = {
  createValidation,
};
