const ObjectID = require("mongodb").ObjectID;
// const fs = require("fs");
// const path = require("path");

module.exports = (app, db) => {
  app.post("/docs", (req, res) => {
    const body = {
      ...req.body,
      users: req.body.users.map(id => ObjectID(id)),
      createdAt: new Date(),
      createdBy: ObjectID(req.body.createdBy)
    };
    db.collection("docs").insertOne(body, (err, result) => {
      if (err) {
        return console.error("Error posting doc: ", err);
      }

      // fs.writeFile(
      //   path.join(__dirname, `/documents/${result.ops[0]._id}.docx`),
      //   Buffer(req.body.content),
      //   err => {
      //     if (err) {
      //       return console.log(err);
      //     }
      //     console.log("The file was saved!");
      //   }
      // );

      res.send({ data: result.ops[0] });
    });
  });
};
