const mongoose = require("mongoose");
const Message = mongoose.model("Message");
const Conversation = require("./conversationService");

class messageService {
  static async create(data) {
    return new Promise((resolve, reject) => {
      new Message(data)
        .save()
        .catch((e) => reject(e))
        .then((message) =>
          Conversation.addMessage(data.conversation, message._id)
            .then(() => resolve(message))
            .catch((e) => reject(e))
        );
    });
  }
}

module.exports = messageService;
