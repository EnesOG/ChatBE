const mongoose = require("mongoose");
const Conversation = mongoose.model("Conversation");
const User = require("./authService");

class conversationService {
  static async create(data) {
    return new Promise((resolve, reject) => {
      new Conversation(data)
        .save()
        .catch((e) => reject(e))
        .then((con) =>
          User.addConversation(data.users, con._id)
            .then(() => resolve(con))
            .catch((e) => reject(e))
        );
    });
  }

  static async addMessage(conId, messageId) {
    try {
      const conversation = await Conversation.findById(conId);
      conversation.messages.push(messageId);
      return conversation.save();
    } catch (e) {
      return e;
    }
  }
}

module.exports = conversationService;
