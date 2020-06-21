const ObjectID = require("mongodb").ObjectID;

module.exports = (app, db) => {
  app.post("/docs", async (req, res) => {
    let users = [];
    await Promise.all(
      req.body.users.map(user =>
        db
          .collection("users")
          .findOne({ email: user.email })
          .then(async foundUser => {
            if (!foundUser) {
              const newUser = await db
                .collection("users")
                .insertOne({ email: user.email })
                .then(({ ops }) => ops[0]);
              console.log("new user", newUser);
              return newUser;
            }
            return foundUser;
          })
      )
    ).then(response => {
      users = response;
      const body = {
        ...req.body,
        users: users.map(user => ObjectID(user._id)),
        createdAt: new Date(),
        createdBy: ObjectID(req.body.createdBy)
      };
      db.collection("docs").insertOne(body, (err, result) => {
        if (err) {
          return console.error("Error posting doc: ", err);
        }
        res.send({ data: result.ops[0] });
      });
    });
  });
};
