require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3000;

// PostgreSQL connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

app.use(cors());
app.use(express.json());

// Endpoint to get and update visitor count
app.get('/visitors', async (req, res) => {
    try {
        // Check if a row exists
        const result = await pool.query('SELECT count FROM visitors LIMIT 1');
        let count;

        if (result.rows.length === 0) {
            // If no record exists, insert a new one with count = 1
            count = 1;
            await pool.query('INSERT INTO visitors (count) VALUES ($1)', [count]);
        } else {
            // If record exists, update count
            count = result.rows[0].count + 1;
            await pool.query('UPDATE visitors SET count = $1', [count]);
        }

        res.json({ count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
