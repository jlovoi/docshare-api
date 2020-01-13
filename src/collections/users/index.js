const usersPost = require("./post");
const usersPatch = require("./patch");
const usersGet = require("./get");

module.exports = (app, db) => {
  usersPost(app, db);
  usersPatch(app, db);
  usersGet(app, db);
};
