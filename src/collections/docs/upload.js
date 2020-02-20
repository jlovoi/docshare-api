const fs = require("fs");
const path = require("path");

module.exports = (app, db) => {
  app.post("/docs/:id/upload", (req, res) => {
    console.log(req.body);
    fs.writeFile(
      path.join(__dirname, `/documents/${req.params.id}.docx`),
      req.body,
      err => {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      }
    );
  });
};
