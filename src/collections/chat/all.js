module.exports = (app, db) => {
  app.get("/chat", (req, res) => {
    db.collection("chat")
      .find({})
      .toArray((err, chat) => {
        if (err) {
          return console.error("Error getting all chat: ", err);
        }
        res.send(chat);
      });
  });
};
