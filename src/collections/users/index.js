const usersPost = require("./post");
const usersPatch = require("./patch");

module.exports = (app, db) => {
  usersPost(app, db);
  usersPatch(app, db);
};
