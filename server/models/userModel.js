const { model, Schema } = require('mongoose');
const bcrypt = require('bcryptjs');

const userModel = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Please add a name'],
			trim: true,
		},
		email: {
			type: String,
			required: [true, 'Please add a email'],
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: [true, 'Please add a password'],
		},
	},
	{ timestamps: true }
);

userModel.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 12);
})

userModel.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = model('User', userModel);
