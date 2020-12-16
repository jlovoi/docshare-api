const ObjectID = require('mongodb').ObjectID;
const Binary = require('mongodb').Binary;

module.exports = (app, db) => {
	app.post('/docs/:id/upload', (req, res) => {
		db.collection('files').insertOne({
			_id: ObjectID(req.params.id),
			content: Binary(req.body),
		});

		res.status(200);
		res.end();
	});
};
