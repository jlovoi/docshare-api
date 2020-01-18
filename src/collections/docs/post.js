module.exports = (app, db) => {
  app.post("/docs", (req, res) => {
    db.collection("docs").save(req.body, (err, result) => {
      if (err) {
        return console.error("Error posting doc: ", err);
      }

      console.log("saved to database");
      res.redirect("/");
    });
  });
};
