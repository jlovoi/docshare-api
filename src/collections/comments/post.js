module.exports = (app, db) => {
	app.post('/comments', async (req, res) => {
		const comment = await db.collection('comments').insertOne(req.body);
		res.send(comment.ops[0]);
	});
};
