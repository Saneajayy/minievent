const express = require('express');
const BookingModel = require('../models/BookingModel');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/:id/bookings', verifyToken, async (req, res, next) => {
    try {
        const userId = parseInt(req.params.id, 10);
        if (req.user.role !== 'admin' && req.user.id !== userId) {
            return res.status(403).json({ error: 'Access denied' });
        }
        
        const bookings = await BookingModel.findByUserId(userId);
        res.status(200).json(bookings);
    } catch(err) {
        next(err);
    }
});

module.exports = router;
