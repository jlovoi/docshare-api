const fs = require('fs');
const path = require('path');
const ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {
	app.get('/docs/:id/download', async (req, res) => {
		db.collection('files').findOne(
			{ _id: ObjectID(req.params.id) },
			(err, file) => {
				if (err) console.error(err);

				const p = path.join(__dirname, `/documents/${req.params.id}.docx`);
				fs.writeFile(p, file.content.buffer, async err => {
					if (err) return console.error(err);

					const doc = await db
						.collection('docs')
						.findOne({ _id: ObjectID(req.params.id) });

					const fileName = doc.name + '.docx';

					res.download(p, fileName, e => {
						if (e) {
							console.error('DOWNLOAD ERROR', e);
							res.send({ error: true, data: e });
						}
						try {
							fs.unlinkSync(p);
						} catch (e) {
							console.error('FAILED TO DELETE TEMP FILE', e);
						}
					});
				});
			},
		);
	});
};
