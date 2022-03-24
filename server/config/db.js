const { connect } = require('mongoose');

const connectDB = async () => {
    try {        
        const db = await connect(process.env.MONGO_URI);
        console.log(`MongoDB is connectiong ${db.connection.host}`.cyan);
    } catch (error) {
        console.log(`${error}`.red);
        process.exit(1);
    }
};

module.exports = connectDB;
