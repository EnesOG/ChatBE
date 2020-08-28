require("dotenv").config();
const express = require("express");
const { syntaxError } = require("./middleware/app");
const app = express();

// middleware for body parser
app.use(express.json());
app.use(syntaxError);
// mongoDB connection
require("./database/connection")();

//import Routes
require("./routes")(app);

app.listen(process.env.SERVER_PORT || 8000, () =>
  console.log(`Server is running on Port ${process.env.SERVER_PORT || 8000}`)
);
