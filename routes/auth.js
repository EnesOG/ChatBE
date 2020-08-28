const express = require("express");
const router = express.Router();
const {
  createValidation,
  loginValidation,
} = require("../database/validation/Auth");
const validate = require("../database/validation");
const { verifyUser } = require("../middleware/Auth");
const Auth = require("../services/authService");

router.post("/register", createValidation(), validate, async (req, res) =>
  res.json(await Auth.register(req.body))
);

router.post("/login", loginValidation(), validate, async (req, res, next) =>
  res.json(await Auth.login(req.body))
);

router.get("/", verifyUser(), validate, (req, res, next) => res.json(req.user));

module.exports = router;
