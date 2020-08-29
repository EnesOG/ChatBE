const mongoose = require("mongoose");
const User = mongoose.model("User");

class authService {
  static async register(data) {
    try {
      const token = await User.register(data);
      return { token };
    } catch (error) {
      return { error };
    }
  }

  static async login(data) {
    try {
      const token = await User.login(data);
      return { token };
    } catch (e) {
      return { e };
    }
  }

  static async all(auth) {
    try {
      const users = await User.find({});
      return users.filter((user) => user._id != auth._id);
    } catch (e) {
      return e;
    }
  }

  static async addConversation(usersId, convId) {
    try {
      const users = await User.find({}).where("_id").in(usersId).exec();
      return users.forEach((user) => {
        user.conversations.push(convId);
        user.save();
      });
    } catch (e) {
      return e;
    }
  }
}

module.exports = authService;
