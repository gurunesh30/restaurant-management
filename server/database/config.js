import dotenv from 'dotenv';
dotenv.config();

/**
 * Database configuration.
 * Uses environment variables with sensible defaults.
 */
const dbConfig = {
    /** MongoDB connection URI */
    uri: process.env.MONGO_URI,

    /** Connection pool options */
    options: {
        autoIndex: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    },
};

export default dbConfig;
