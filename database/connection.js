const mongoose = require("mongoose");
const requireDir = require("require-dir");
const AutoIncrement = require("mongoose-sequence")(mongoose);

module.exports = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

  // If the Node process ends, close the Mongoose connection
  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log(
        "Mongoose default connection disconnected through app termination"
      );
      process.exit(0);
    });
  });

  requireDir("../database/model");
};
