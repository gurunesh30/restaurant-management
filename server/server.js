import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectDB, disconnectDB, dbConfig } from './database/index.js';
import menuRoutes from './routes/menuRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ── Middleware ── */
app.use(cors());
app.use(express.json());

/* ── Routes ── */
app.use('/api/menu', menuRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/contacts', contactRoutes);

/* ── Health check ── */
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/* ── Connect to MongoDB and start server ── */
const startServer = async () => {
    await connectDB(dbConfig.uri, dbConfig.options);

    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`   API Endpoints:`);
        console.log(`   GET/POST        /api/menu`);
        console.log(`   GET/PUT/DELETE  /api/menu/:id`);
        console.log(`   GET/POST        /api/reservations`);
        console.log(`   GET/PUT/DELETE  /api/reservations/:id`);
        console.log(`   GET/POST        /api/contacts`);
        console.log(`   PUT/DELETE      /api/contacts/:id`);
    });
};

/* ── Graceful shutdown ── */
process.on('SIGINT', async () => {
    await disconnectDB();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await disconnectDB();
    process.exit(0);
});

startServer();
