const ObjectID = require('mongodb').ObjectID;

module.exports = (app, db) => {
	app.get('/comments/:id', async (req, res) => {
		const thing = await db.collection('comments').aggregate([
			{
				$lookup: {
					from: 'users',
					localField: 'userId',
					foreignField: '_id',
					as: 'enrollee_info',
				},
			},
		]);

		console.log(thing);
		// .find({ docId: req.params.id })
		// .toArray(async (err, comments) => {
		// 	const enhancedComments = await comments.map(async (comment, index) => {
		// 		const user = await db
		// 			.collection('users')
		// 			.findOne({ _id: ObjectID(comment.userId) }, (err, response) => {
		// 				if (err) {
		// 					return console.error('Error getting user: ', err);
		// 				}
		// 				console.log(response);
		// 				return response;
		// 			});
		// 		console.log('USER', user);
		// 		return { ...comment, userName: user.firstName + ' ' + user.lastName };
		// 	});
		// });
	});
};
