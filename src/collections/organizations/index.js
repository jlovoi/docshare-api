const organizationsGet = require("./get");

module.exports = (app, db) => {
  organizationsGet(app, db);
};
