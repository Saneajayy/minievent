const pool = require('../config/db');
const { v4: uuidv4 } = require('uuid');

class BookingModel {
    static async createBooking(userId, eventId) {
        const connection = await pool.getConnection();
        
        try {
            await connection.beginTransaction();

            // Check availability FOR UPDATE
            const [events] = await connection.query(
                'SELECT remaining_tickets FROM events WHERE id = ? FOR UPDATE',
                [eventId]
            );

            if (events.length === 0) {
                throw new Error('Event not found');
            }

            const remaining = events[0].remaining_tickets;
            if (remaining <= 0) {
                throw new Error('Tickets are sold out for this event');
            }

            // Decrement tickets
            await connection.query(
                'UPDATE events SET remaining_tickets = remaining_tickets - 1 WHERE id = ?',
                [eventId]
            );

            const bookingCode = uuidv4();

            // Insert booking
            const [result] = await connection.query(
                'INSERT INTO bookings (user_id, event_id, booking_code) VALUES (?, ?, ?)',
                [userId, eventId, bookingCode]
            );

            await connection.commit();
            return { id: result.insertId, user_id: userId, event_id: eventId, booking_code: bookingCode };
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    static async findByUserId(userId) {
        const [rows] = await pool.query(
            `SELECT b.id, b.booking_code, b.booking_date, e.title as event_title, e.date as event_date, e.id as event_id
             FROM bookings b
             JOIN events e ON b.event_id = e.id
             WHERE b.user_id = ?
             ORDER BY b.booking_date DESC`,
            [userId]
        );
        return rows;
    }
}
module.exports = BookingModel;
