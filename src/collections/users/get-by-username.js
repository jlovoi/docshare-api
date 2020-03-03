module.exports = (app, db) => {
  app.get("/users/username/:username", (req, res) => {
    db.collection("users").findOne(
      { username: req.params.username },
      (err, doc) => {
        if (err) {
          return console.error("Error getting user: ", err);
        }
        const response = { ...doc };
        delete response.password;
        res.send(response);
      }
    );
  });
};
