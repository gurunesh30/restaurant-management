import mongoose from 'mongoose';

/**
 * Connect to MongoDB with retry logic.
 * @param {string} uri - MongoDB connection string
 * @param {object} options - Mongoose connection options
 */
const connectDB = async (uri, options = {}) => {
    const defaultOptions = {
        autoIndex: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        ...options,
    };

    try {
        const conn = await mongoose.connect(uri, defaultOptions);
        console.log(`✅ MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);

        // Connection event listeners
        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err.message);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('⚠️  MongoDB disconnected. Attempting reconnect...');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('✅ MongoDB reconnected successfully');
        });

        return conn;
    } catch (err) {
        console.error('❌ MongoDB initial connection failed:', err.message);
        console.log('💡 Make sure MongoDB is running. Update MONGODB_URI in .env if needed.');
        process.exit(1);
    }
};

/**
 * Gracefully close the MongoDB connection.
 */
const disconnectDB = async () => {
    try {
        await mongoose.connection.close();
        console.log('🔌 MongoDB connection closed gracefully');
    } catch (err) {
        console.error('Error closing MongoDB connection:', err.message);
        process.exit(1);
    }
};

export { connectDB, disconnectDB };
