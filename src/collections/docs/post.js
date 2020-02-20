const ObjectID = require("mongodb").ObjectID;

module.exports = (app, db) => {
  app.post("/docs", (req, res) => {
    console.log(req.body);
    const body = {
      ...req.body,
      content: Buffer.from(req.body.content, "utf8"),
      users: req.body.users.map(id => ObjectID(id)),
      createdAt: new Date(),
      createdBy: ObjectID(req.body.createdBy)
    };
    db.collection("docs").insertOne(body, (err, result) => {
      if (err) {
        return console.error("Error posting doc: ", err);
      }

      res.send({ data: result.ops[0] });
    });
  });
};
