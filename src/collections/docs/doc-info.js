const fs = require('fs');
const path = require('path');
const ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {
	app.get('/docs/:id/info', async (req, res) => {
		const docId = req.params.id;

		db.collection('files').findOne(
			{ _id: ObjectID(req.params.id) },
			(err, file) => {
				if (err) console.error(err);

				if (!file || !file.content) {
					res.status(404);
					res.json({ error: 'Could not find specified file.' });
					return;
				}

				const p = path.join(__dirname, `/documents/${req.params.id}.docx`);
				fs.writeFile(p, file.content.buffer, async err => {
					if (err) return console.error(err);

					const spawn = require('child_process').spawn;

					const py = spawn('python3', ['./src/collections/docs/extract.py']);
					let output = '';

					py.stdout.on('data', function (data) {
						output += data.toString();
					});
					py.stdout.on('end', function () {
						// console.log("output: ", output);
						res.send(JSON.stringify(output));
						try {
							fs.unlinkSync(p);
						} catch (e) {
							console.error('FAILED TO DELETE TEMP FILE', e);
						}
					});
					py.stdin.write(JSON.stringify(docId));
					py.stdin.end();
				});
			},
		);
	});
};
