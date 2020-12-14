const commentsGet = require('./get');
const commentsPost = require('./post');

module.exports = (app, db) => {
	commentsGet(app, db);
	commentsPost(app, db);
};
