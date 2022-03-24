const Goal = require('../models/goalModel');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

// @route GET /api/goals
exports.getGoals = asyncHandler(async (req, res) => {
	const goals = await Goal.find();
	res.json(goals);
});

// @route POST /api/goals
exports.postGoal = asyncHandler(async (req, res) => {
	const text = req.body.text;
	if (!text) {
		res.status(400);
		throw new Error('Please add a text field');
	}

	const goal = await Goal.create({ text });

	res.json(goal);
});

// @route GET /api/goals/:id
exports.getGoal = asyncHandler(
	asyncHandler(async (req, res) => {
		const validId = mongoose.Types.ObjectId.isValid(req.params.id);
		if (!validId) {
			res.status(404);
			throw new Error('Goal not found');
		}

		const goal = await Goal.findById(req.params.id);
		res.json(goal);
	})
);

// @route PUT /api/goals/:id
exports.updateGoal = asyncHandler(async (req, res) => {
	const validId = mongoose.Types.ObjectId.isValid(req.params.id);
	if (!validId) {
		res.status(404);
		throw new Error('Goal not found');
	}

	const updateGoal = await Goal.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
		}
	);

	res.json(updateGoal);
});

// @route DELETE /api/goals/:id
exports.deleteGoal = asyncHandler(async (req, res) => {
		const validId = mongoose.Types.ObjectId.isValid(req.params.id);
		if (!validId) {
			res.status(404);
			throw new Error('Goal not found');
		}
	await Goal.findByIdAndRemove(req.params.id)
	res.json({ message: 'Delete goal successfully', id: req.params.id });
});
