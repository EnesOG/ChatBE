const fs = require("fs");
const currentFile = require("path").basename(__filename);
var routePath = "./routes";

module.exports = (app) => {
  fs.readdirSync(routePath)
    .filter((file) => file !== currentFile)
    .forEach((file) => {
      app.use(`/${file.replace(".js", "")}`, require(`./${file}`));
    });
};
