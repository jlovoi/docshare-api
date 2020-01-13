const usersPost = require("./post");
const usersPatch = require("./patch");
const usersGet = require("./get");
const usersAll = require("./all");

module.exports = (app, db) => {
  usersPost(app, db);
  usersPatch(app, db);
  usersGet(app, db);
  usersAll(app, db);
};
