const docsPost = require("./post");
const docsPatch = require("./patch");
const docsGet = require("./get");
const docsAll = require("./all");
const docsDelete = require("./delete");

module.exports = (app, db) => {
  docsPost(app, db);
  docsPatch(app, db);
  docsGet(app, db);
  docsAll(app, db);
  docsDelete(app, db);
};
