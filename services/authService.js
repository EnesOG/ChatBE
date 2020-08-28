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

  static async getParents() {
    try {
      const parents = await User.find().populate("children");
      return parents;
    } catch (e) {
      return e;
    }
  }
}

module.exports = authService;
