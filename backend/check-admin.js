require('dotenv').config();
const mysql = require('mysql2/promise');

async function checkAdmin() {
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

        const [rows] = await pool.query("SELECT * FROM users WHERE role = 'admin'");
        console.log("Admin users in DB:", rows);
        process.exit(0);
    } catch(err) {
        console.error("Error reading db:", err);
        process.exit(1);
    }
}
checkAdmin();
