module.exports = (app, db) => {
  app.post("/users", (req, res) => {
    db.collection("users").save(req.body, (err, result) => {
      if (err) {
        return console.error("Error posting user: ", err);
      }

      console.log("saved to database");
      res.redirect("/");
    });
  });
};
