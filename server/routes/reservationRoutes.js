import express from 'express';
import Reservation from '../models/Reservation.js';

const router = express.Router();

// GET all reservations (with optional date/status filter)
router.get('/', async (req, res) => {
    try {
        const filter = {};
        if (req.query.date) filter.date = String(req.query.date);
        if (req.query.status) filter.status = String(req.query.status);

        console.log(`[RESERVATIONS GET] Query:`, req.query);
        console.log(`[RESERVATIONS GET] Filter:`, filter);

        if (!Reservation) {
            throw new Error('Reservation model is not loaded');
        }

        const reservations = await Reservation.find(filter).sort({ date: 1, time: 1 });
        console.log(`[RESERVATIONS GET] Found ${reservations.length} records`);
        res.json(reservations);
    } catch (err) {
        console.error(`[RESERVATIONS GET] CRITICAL ERROR:`, err);
        res.status(500).json({
            error: 'Internal Server Error',
            message: err.message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack
        });
    }
});

// GET single reservation
router.get('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
        res.json(reservation);
    } catch (err) {
        console.error(`[GET /api/reservations/:id] Error:`, err);
        res.status(500).json({ error: err.message });
    }
});

// CREATE reservation
router.post('/', async (req, res) => {
    try {
        console.log(`[RESERVATIONS POST] Request Body:`, JSON.stringify(req.body, null, 2));

        // Basic sanity check for required fields
        const required = ['customer_name', 'email', 'phone', 'date', 'time', 'table_id', 'floor', 'guests'];
        const missing = required.filter(field => !req.body[field]);

        if (missing.length > 0) {
            console.warn(`[RESERVATIONS POST] Missing fields:`, missing);
            return res.status(400).json({
                error: 'Bad Request',
                message: `Missing required fields: ${missing.join(', ')}`
            });
        }

        // Force guests to Number
        req.body.guests = Number(req.body.guests);

        const reservation = await Reservation.create(req.body);
        console.log(`[RESERVATIONS POST] Created successfully:`, reservation._id);
        res.status(201).json(reservation);
    } catch (err) {
        console.error(`[RESERVATIONS POST] Creation Error:`, err);
        res.status(400).json({
            error: 'Database Error',
            message: err.message,
            errors: err.errors
        });
    }
});

// UPDATE reservation (e.g. change status)
router.put('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
        res.json(reservation);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE reservation
router.delete('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
        res.json({ message: 'Reservation deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
