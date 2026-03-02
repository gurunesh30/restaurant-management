import express from 'express';
import Reservation from '../models/Reservation.js';

const router = express.Router();

// GET all reservations (with optional date/status filter)
router.get('/', async (req, res) => {
    try {
        const filter = {};
        if (req.query.date) filter.date = req.query.date;
        if (req.query.status) filter.status = req.query.status;

        const reservations = await Reservation.find(filter).sort({ date: 1, time: 1 });
        res.json(reservations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET single reservation
router.get('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) return res.status(404).json({ error: 'Reservation not found' });
        res.json(reservation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CREATE reservation
router.post('/', async (req, res) => {
    try {
        const reservation = await Reservation.create(req.body);
        res.status(201).json(reservation);
    } catch (err) {
        res.status(400).json({ error: err.message });
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
