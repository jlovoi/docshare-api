const usersPatch = require("./patch");
const usersGet = require("./get");
const usersGetByUsername = require("./get-by-username");
const usersAll = require("./all");
const usersDelete = require("./delete");

module.exports = (app, db) => {
  usersPatch(app, db);
  usersGet(app, db);
  usersGetByUsername(app, db);
  usersAll(app, db);
  usersDelete(app, db);
};
