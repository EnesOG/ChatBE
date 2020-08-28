const express = require("express");
const router = express.Router();
const { createValidation } = require("../database/validation/Conversation");
const validate = require("../database/validation");
const Conversation = require("../services/conversationService");

router.post("/create", createValidation(), validate, async (req, res) =>
  res.json(await Conversation.create(req.body))
);

module.exports = router;
