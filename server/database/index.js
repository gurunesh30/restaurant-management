/**
 * Database module barrel export.
 * Import everything from here:
 *   import { connectDB, disconnectDB, dbConfig } from './database/index.js';
 */
export { connectDB, disconnectDB } from './connection.js';
export { default as dbConfig } from './config.js';
