const express = require('express');
const BookingModel = require('../models/BookingModel');

const router = express.Router();

router.get('/:id/bookings', async (req, res, next) => {
    try {
        const userId = req.params.id;
        const bookings = await BookingModel.findByUserId(userId);
        res.status(200).json(bookings);
    } catch(err) {
        next(err);
    }
});

module.exports = router;
