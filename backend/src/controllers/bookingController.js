const BookingModel = require('../models/BookingModel');
const { validationResult } = require('express-validator');

exports.bookTicket = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { event_id } = req.body;
        const user_id = req.user.id;
        
        const booking = await BookingModel.createBooking(user_id, event_id);
        
        res.status(201).json(booking);
    } catch (err) {
        if (err.message === 'Event not found' || err.message === 'Tickets are sold out for this event') {
            return res.status(400).json({ error: err.message });
        }
        next(err);
    }
};
