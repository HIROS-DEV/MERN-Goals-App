const asyncHandler = require('express-async-handler');

// @route GET /api/goals
exports.getGoals = asyncHandler(async(req, res) => {
	res.json({ message: 'Get goals' });
});

// @route POST /api/goals
exports.postGoal = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error('Please add a text field');
	}
	res.json({ message: 'Post goal' });
});

// @route GET /api/goals/:id
exports.getGoal = asyncHandler(asyncHandler(async (req, res) => {
	res.json({ message: 'Get goal', id: req.params.id });
}));

// @route PUT /api/goals/:id
exports.updateGoal = asyncHandler(async (req, res) => {
	res.json({ message: 'Update goal', id: req.params.id });
});

// @route DELETE /api/goals/:id
exports.deleteGoal = asyncHandler(async (req, res) => {
	res.json({ message: 'Delete goal', id: req.params.id });
});
