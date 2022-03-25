const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

exports.registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		res.status(400);
		throw new Error('Please add all fields');
	}

	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error('User already exists');
	}

	const user = new User({ name, email, password });
	if (user) {
		await user.save();
		res.status(201).json({
			id: user._id,
			name,
			email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

exports.loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user && (await user.matchPassword(password))) {
		res.json({ id: user._id, email, name: user.name, token: generateToken(user._id) });
	} else {
		res.status(400);
		throw new Error('Invalid Email or Password');
	}
});

//@access Private
exports.getMe = asyncHandler(async (req, res) => {
	res.json(req.user);
});

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: '1d',
	});
};
