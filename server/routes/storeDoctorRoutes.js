const express = require('express');
const router = express.Router();
const pool = require('../db');
const { verifyAdmin } = require('../middleware/authMiddleware');

// Matches POST http://localhost:5000/api/store-doctors/link
router.post('/link', verifyAdmin, async (req, res) => {
    try {
        const { doctor_id, store_id, consultation_fee, available_days } = req.body;
        
        const newLink = await pool.query(
            "INSERT INTO store_doctors (doctor_id, store_id, consultation_fee, available_days) VALUES ($1, $2, $3, $4) RETURNING *",
            [doctor_id, store_id, consultation_fee, available_days]
        );
        
        res.status(201).json(newLink.rows[0]);
    } catch (err) {
        console.error("Link Error:", err.message);
        res.status(500).json({ error: "Database error while linking doctor" });
    }
});

module.exports = router;