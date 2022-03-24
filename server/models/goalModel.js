const { model, Schema } = require('mongoose');

const goalModel = new Schema(
	{
		text: {
			type: String,
			required: [true, 'Please add a text value'],
		},
	},
	{ timestamps: true }
);

module.exports = model('Goal', goalModel);