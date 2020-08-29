const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  conversation: {
    type: Schema.Types.ObjectId,
    ref: "Conversation",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

mongoose.model("Message", messageSchema);
