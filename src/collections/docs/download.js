const path = require("path");
const ObjectID = require("mongodb").ObjectID;

module.exports = (app, db) => {
  app.get("/docs/:id/download", async (req, res) => {
    const p = path.join(__dirname, `/documents/${req.params.id}.docx`);

    const doc = await db
      .collection("docs")
      .findOne({ _id: ObjectID(req.params.id) });

    const fileName = doc.name + ".docx";

    res.download(p, fileName, e => {
      if (e) {
        console.error("DOWNLOAD ERROR", e);
        res.send({ error: true, data: e });
      }
    });
  });
};
