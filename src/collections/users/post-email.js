module.exports = (app, db) => {
  app.post("/email", (req, res) => {
    const body = {
      ...req.body,
      createdAt: new Date()
    };
    db.collection("emails").insertOne(body, (err, result) => {
      if (err) {
        res.send({ status: 500, error: err });
        return console.error("Error posting email: ", err);
      }

      res.send({ status: 200 });
    });
  });
};
