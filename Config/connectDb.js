const mongoose = require('mongoose');
const { MONGODB_URL } = require('./env');

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
