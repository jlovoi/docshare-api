const ObjectID = require('mongodb').ObjectID;
const Binary = require('mongodb').Binary;

module.exports = (app, db) => {
	app.patch('/docs/:id/patch-file', (req, res) => {
		db.collection('files').updateOne(
			{ _id: ObjectID(req.params.id) },
			{
				$set: {
					content: Binary(req.body),
				},
			},
		);

		res.status(200);
		res.end();
	});
};
