const mongoose = require("mongoose");
const { Schema } = mongoose;

const conversationSchema = new Schema({
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

mongoose.model("Conversation", conversationSchema);
