module.exports = (app, db) => {
  app.get("/users/username/:username", async (req, res) => {
    const doc = await db
      .collection("users")
      .findOne(
        { username: req.params.username },
        { projection: { password: 0 } }
      );
    res.send(doc);
  });
};
