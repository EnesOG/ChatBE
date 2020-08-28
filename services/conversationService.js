const mongoose = require("mongoose");
const Conversation = mongoose.model("Conversation");

class conversationService {
  static async create(data) {
    return new Promise((resolve, reject) => {
      new Conversation(data)
        .save()
        .catch((e) => reject(e))
        .then((con) => resolve(con));
    });
  }
}

module.exports = conversationService;
