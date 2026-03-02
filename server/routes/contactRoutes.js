import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// GET all contact messages
router.get('/', async (req, res) => {
    try {
        const filter = {};
        if (req.query.unread === 'true') filter.is_read = false;

        const messages = await Contact.find(filter).sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CREATE contact message
router.post('/', async (req, res) => {
    try {
        const message = await Contact.create(req.body);
        res.status(201).json(message);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// UPDATE (mark as read)
router.put('/:id', async (req, res) => {
    try {
        const message = await Contact.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!message) return res.status(404).json({ error: 'Message not found' });
        res.json(message);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE contact message
router.delete('/:id', async (req, res) => {
    try {
        const message = await Contact.findByIdAndDelete(req.params.id);
        if (!message) return res.status(404).json({ error: 'Message not found' });
        res.json({ message: 'Message deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
