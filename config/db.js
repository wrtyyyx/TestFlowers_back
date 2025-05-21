const mongoose = require('mongoose');
const { MONGO_URI } = process.env;

module.exports = async function connectDB() {
    await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
};