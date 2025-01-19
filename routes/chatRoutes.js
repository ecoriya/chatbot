const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const router = express.Router();
const db = new sqlite3.Database('./db/database.sqlite');

// Initialize database table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_message TEXT NOT NULL,
            bot_response TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
});

// API to handle user messages
router.post('/sendMessage', (req, res) => {
    const { user_message } = req.body;

    // Generate a bot response (static for now)
    const bot_response = `You said: ${user_message}`;

    // Save to database
    db.run(
        `INSERT INTO messages (user_message, bot_response) VALUES (?, ?)`,
        [user_message, bot_response],
        function (err) {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            res.json({
                id: this.lastID,
                user_message,
                bot_response,
                timestamp: new Date().toISOString(),
            });
        }
    );
});

// API to retrieve all messages
router.get('/messages', (req, res) => {
    db.all(`SELECT * FROM messages ORDER BY timestamp ASC`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(rows);
    });
});

module.exports = router;
