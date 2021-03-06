require('dotenv').config();
require('colors');

const express = require('express');
const morgan = require('morgan');
const path = require('path');

const connectDB = require('./config/db');
const { errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Server frontent
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));
	app.get('*', (req, res) =>
		res.sendFile(
			path.resolve(__dirname, '../', 'client', 'build', 'index.html')
		)
	);
}

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`.blue);
});
