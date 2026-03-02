/**
 * Database configuration.
 * Uses environment variables with sensible defaults.
 */
const dbConfig = {
    /** MongoDB connection URI */
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/restraunt',

    /** Connection pool options */
    options: {
        autoIndex: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    },
};

export default dbConfig;
