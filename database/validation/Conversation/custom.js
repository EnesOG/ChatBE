const mongoose = require("mongoose");
const Conversation = mongoose.model("Conversation");

const doesConversationExist = (id) =>
  Conversation.findById(id).then((conversation) => {
    if (!conversation) {
      return Promise.reject("Conversation does not exist");
    }
  });

module.exports = {
  doesConversationExist,
};
