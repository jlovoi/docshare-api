module.exports = (app, db) => {
  app.post("/test", (req, res) => {
    console.log(req.body);
    db.collection("test").save(req.body, (err, result) => {
      if (err) {
        return console.log("Error posting user: ", err);
      }

      console.log("saved to database");
      res.redirect("/");
    });
  });
};
