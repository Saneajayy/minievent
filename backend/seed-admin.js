require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

async function seedAdmin() {
    try {
        const pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        await pool.query(
            "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE password = ?, role = ?",
            ['Admin User', 'admin@admin.com', hashedPassword, 'admin', hashedPassword, 'admin']
        );
        console.log("Admin seeded successfully: Email: admin@admin.com, Password: admin123");
        process.exit(0);
    } catch(err) {
        console.error("Error seeding admin db:", err);
        process.exit(1);
    }
}
seedAdmin();
