const register = require("./register");
const login = require("./log-in");

module.exports = (app, db) => {
  register(app, db);
  login(app, db);
};
