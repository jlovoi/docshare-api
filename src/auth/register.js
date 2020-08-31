const bcrypt = require("bcrypt");
const ObjectID = require("mongodb").ObjectID;

module.exports = (app, db) => {
  app.post("/register", (req, res) => {
    const {
      username,
      password,
      firstName,
      lastName,
      email,
      title,
      organization
    } = req.body;
    const saltRounds = 10;
    db.collection("users")
      .findOne({ username })
      .then(user => {
        if (!user) {
          bcrypt.hash(password, saltRounds, function(err, hash) {
            db.collection("users").insertOne(
              {
                username,
                password: hash,
                firstName,
                lastName,
                email,
                title,
                organization: ObjectID(organization)
              },
              (err, result) => {
                if (err) {
                  return console.error("Error registering user: ", err);
                }
                res.status(200);
                res.json({ ok: true });
              }
            );
          });
        } else {
          res.status(401);
          res.json({ ok: false });
        }
      });
  });
};
