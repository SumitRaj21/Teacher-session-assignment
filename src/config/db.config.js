const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB...');

        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error('MONGODB_URI is missing in .env');
        }

        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log('MongoDB connected successfully ✅');
        console.log('Host:', mongoose.connection.host);
        console.log('Database:', mongoose.connection.name);

    } catch (error) {
        console.error('MongoDB connection failed ❌');
        console.error('Error message:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
