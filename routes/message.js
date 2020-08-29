const express = require("express");
const router = express.Router();
const { createValidation } = require("../database/validation/Message");
const validate = require("../database/validation");
const Message = require("../services/messageService");

router.post("/create", createValidation(), validate, async (req, res) =>
  res.json(await Message.create(req.body))
);

module.exports = router;
