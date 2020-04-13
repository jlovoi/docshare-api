const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (app, db) => {
  app.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.collection("users")
      .findOne({ username })
      .then(user => {
        console.log("User Found: ", user);
        if (user === null) {
          res.status(401);
          res.json(false);
          return;
        }
        bcrypt.compare(password, user.password, function(err, result) {
          if (result === true) {
            console.log("Valid!");
            let token = jwt.sign(
              { username: user.username },
              "mob ties ting eh",
              { expiresIn: 129600 }
            );
            res.json({
              success: true,
              err: null,
              token
            });
          } else {
            console.error("Entered Password and Hash do not match!");
            res.status(401).json({
              success: false,
              token: null,
              err: "Entered Password and Hash do not match!"
            });
          }
        });
      });
  });
};
