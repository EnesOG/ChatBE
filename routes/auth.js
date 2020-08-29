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

router.get("/", verifyUser(), validate, async (req, res, next) => {
  const [users] = await Promise.all([Auth.all(req.user)]);

  res.json({ user: req.user, users });
});

router.get("/all", verifyUser(), validate, async (req, res, next) =>
  res.json(await Auth.all())
);

module.exports = router;
