const bcrypt = require("bcrypt");

module.exports = (app, db) => {
  app.post("/register", (req, res) => {
    const { username, password } = req.body;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function(err, hash) {
      db.collection("users").insertOne(
        { username, password: hash },
        (err, result) => {
          if (err) {
            return console.error("Error registering user: ", err);
          }
          res.json({ status: 200, ok: true });
        }
      );
    });
  });
};
