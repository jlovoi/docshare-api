module.exports = (app, db) => {
  app.post("/chat", (req, res) => {
    db.collection("chat").save(req.body, (err, result) => {
      if (err) {
        return console.log("Error posting chat: ", err);
      }

      console.log("saved to database");
      res.redirect("/");
    });
  });
};
