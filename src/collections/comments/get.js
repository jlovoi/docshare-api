module.exports = (app, db) => {
	app.get('/comments/:id', async (req, res) => {
		const join = await db.collection('comments').aggregate([
			{ $match: { docId: req.params.id } },
			{
				$lookup: {
					let: { userObjId: { $toObjectId: '$userId' } },
					from: 'users',
					pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$userObjId'] } } }],
					as: 'userName',
				},
			},
		]);

		const comments = await join.toArray();
		const enhancedData = comments.map(comment => {
			const userDetails = comment.userName && comment.userName[0];
			return {
				...comment,
				userName: userDetails.firstName + ' ' + userDetails.lastName,
			};
		});

		res.send(enhancedData);
	});
};
