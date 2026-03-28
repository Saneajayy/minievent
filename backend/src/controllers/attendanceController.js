const pool = require('../config/db');
const { validationResult } = require('express-validator');

exports.markAttendance = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const event_id = req.params.id;
        const { booking_code } = req.body;
        
        // Find booking
        const [bookings] = await pool.query(
            'SELECT * FROM bookings WHERE booking_code = ? AND event_id = ?',
            [booking_code, event_id]
        );

        if (bookings.length === 0) {
            return res.status(404).json({ error: 'Invalid booking code for this event' });
        }

        const booking = bookings[0];
        const user_id = booking.user_id;

        // Note: Can check if attendance is already recorded here for this specific ticket.
        // Assuming user can only enter once per ticket.

        // Insert into attendance
        await pool.query(
            'INSERT INTO attendance (user_id, event_id) VALUES (?, ?)',
            [user_id, event_id]
        );

        // Find total tickets booked by user for this event
        const [totalBookings] = await pool.query(
            'SELECT COUNT(*) as total_tickets FROM bookings WHERE user_id = ? AND event_id = ?',
            [user_id, event_id]
        );

        res.status(200).json({ 
            message: 'Attendance marked successfully',
            tickets_booked: totalBookings[0].total_tickets
        });
    } catch(err) {
        next(err);
    }
};
