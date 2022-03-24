require('dotenv').config();
require('colors');

const express = require('express');
const morgan = require('morgan');
const { errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/api/goals', require('./routes/goalRoutes'));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`.blue);
});
