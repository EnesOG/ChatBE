const syntaxError = (error, req, res, next) => {
  if (error instanceof SyntaxError) {
    res.status(500).json({ message: "Er is iets fouts gegaan in de code!" })
      .status;
  } else {
    next();
  }
};

module.exports = {
  syntaxError,
};
