// const fs = require('fs');
// const path = require('path');
const ObjectID = require('mongodb').ObjectID;
const Binary = require('mongodb').Binary;

module.exports = (app, db) => {
	app.post('/docs/:id/upload', (req, res) => {
		db.collection('files').insertOne({
			_id: ObjectID(req.params.id),
			content: Binary(req.body),
		});

		// fs.writeFile(
		// 	path.join(__dirname, `/documents/${req.params.id}.docx`),
		// 	req.body,
		// 	err => {
		// 		if (err) {
		// 			return console.log(err);
		// 		}
		// 		console.log(`Saved file: ${req.params.id}.docx`);
		// 	},
		// );

		res.status(200);
		res.end();
	});
};
