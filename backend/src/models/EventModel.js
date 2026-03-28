const pool = require('../config/db');

class EventModel {
    static async findAll() {
        const [rows] = await pool.query('SELECT * FROM events ORDER BY date ASC');
        return rows;
    }
    
    static async create(eventData) {
        const { title, description, date, total_capacity } = eventData;
        const [result] = await pool.query(
            'INSERT INTO events (title, description, date, total_capacity, remaining_tickets) VALUES (?, ?, ?, ?, ?)',
            [title, description || null, date, total_capacity, total_capacity]
        );
        return result.insertId;
    }
    
    static async findById(id) {
        const [rows] = await pool.query('SELECT * FROM events WHERE id = ?', [id]);
        return rows[0];
    }
}

module.exports = EventModel;
