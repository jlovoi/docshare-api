const chatPost = require("./post");
const chatPatch = require("./patch");
const chatGet = require("./get");
const chatAll = require("./all");
const chatDelete = require("./delete");

module.exports = (app, db) => {
  chatPost(app, db);
  chatPatch(app, db);
  chatGet(app, db);
  chatAll(app, db);
  chatDelete(app, db);
};
