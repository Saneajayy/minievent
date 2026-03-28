require('dotenv').config();
const app = require('./app');
const pool = require('./src/config/db');

const PORT = process.env.PORT || 3000;

// Test DB Connection before starting the server
pool.getConnection()
    .then((connection) => {
        console.log('Connected to MySQL database successfully.');
        connection.release();
        
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`API Docs available at http://localhost:${PORT}/api-docs`);
        });
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
        process.exit(1);
    });
