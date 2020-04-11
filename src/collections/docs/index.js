const docsApprove = require("./approve");
const docsPost = require("./post");
const docsPatch = require("./patch");
const docsGet = require("./get");
const docsAll = require("./all");
const docsDelete = require("./delete");
const docsDownload = require("./download");
const docsUpload = require("./upload");
const docsAllByUser = require("./all-by-user");
const docsInfo = require("./doc-info");
const docsPatchFile = require("./patch-file");

module.exports = (app, db) => {
  docsApprove(app, db);
  docsPost(app, db);
  docsPatch(app, db);
  docsGet(app, db);
  docsAll(app, db);
  docsDelete(app, db);
  docsDownload(app, db);
  docsUpload(app, db);
  docsAllByUser(app, db);
  docsInfo(app, db);
  docsPatchFile(app, db);
};
