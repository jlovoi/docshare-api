const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const exjwt = require('express-jwt');
const fs = require('fs');
const http = require('http');
const https = require('https');

const users = require('./src/collections/users');
const chat = require('./src/collections/chat');
const docs = require('./src/collections/docs');
const comments = require('./src/collections/comments');
const organizations = require('./src/collections/organizations');
const auth = require('./src/auth');

// Certificate
let credentials = {};
const dev = process.env.NODE_ENV === 'development';
if (!dev) {
	const privateKey = fs.readFileSync(
		'/etc/letsencrypt/live/tryhighnoon.com/privkey.pem',
		'utf8',
	);
	const certificate = fs.readFileSync(
		'/etc/letsencrypt/live/tryhighnoon.com/cert.pem',
		'utf8',
	);
	const ca = fs.readFileSync(
		'/etc/letsencrypt/live/tryhighnoon.com/chain.pem',
		'utf8',
	);

	credentials = {
		key: privateKey,
		cert: certificate,
		ca: ca,
	};
}

const app = express();
app.use(
	bodyParser({
		json: { limit: '50mb', extended: true },
		urlencoded: { limit: '50mb', extended: true },
	}),
);

app.use(bodyParser.raw({ type: 'application/octet-stream' }));

app.use(cors());

const url = ''; //url omitted

var db;

const jwtMW = exjwt({
	//secret: 'goes here'
});

MongoClient.connect(url, (err, client) => {
	if (err) return console.error('Error connecting to db', err);
	db = client.db('docshare');

	users(app, db);
	docs(app, db);
	auth(app, db);
	organizations(app, db);
	comments(app, db);

	app.post('/', (req, res) => {
		res.send('Hello!');
	});

	app.get('/', jwtMW, (req, res) => {
		res.send('You are authenticated');
	});

	const httpServer = http.createServer(app);

	httpServer.listen(8080, () => {
		console.log('HTTP Server running on port 80');
	});

	if (!dev) {
		const httpsServer = https.createServer(credentials, app);
		httpsServer.listen(2599, () => {
			console.log('HTTPS Server running on port 2599');
		});
	}
});
