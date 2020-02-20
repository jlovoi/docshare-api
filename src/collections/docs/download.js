const ObjectID = require("mongodb").ObjectID;

module.exports = (app, db) => {
  app.get("/docs/:id/download", async (req, res) => {
    let doc = await db
      .collection("docs")
      .findOne({ _id: ObjectID(req.params.id) });
    const content = Buffer.from(doc.content);
    console.log(content);
    res.set({
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Length": Buffer.byteLength(content)
    });
    res.write(content);
    res.end();
  });
};
