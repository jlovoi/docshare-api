module.exports = (app, db) => {
  app.get("/docs", (req, res) => {
    db.collection("docs")
      .find({})
      .toArray((err, docs) => {
        if (err) {
          return console.log("Error getting all docs: ", err);
        }
        res.send(docs);
      });
  });
};
