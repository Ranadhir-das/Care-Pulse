// server/routes/storeRoutes.js
const express = require('express');
const router = express.Router();
const pool = require('../db');
const { verifyAdmin } = require('../middleware/authMiddleware');

// 1. GET all stores -> Matches http://localhost:5000/api/stores
// server/routes/storeRoutes.js

// GET all stores with owner email
router.get('/', async (req, res) => {
    try {
        const query = `
            SELECT 
                s.id, 
                s.store_name, 
                s.address, 
                s.contact_info, 
                u.email AS owner_email 
            FROM medical_stores s
            LEFT JOIN users u ON s.owner_id = u.id
            ORDER BY s.store_name ASC;
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

// 2. GET store owners -> Matches http://localhost:5000/api/stores/owners
router.get('/owners', verifyAdmin, async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, email FROM users WHERE role = 'store' ORDER BY email ASC"
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Could not fetch owners" });
    }
});

// 3. POST new store -> Matches http://localhost:5000/api/stores/add
router.post('/add', verifyAdmin, async (req, res) => {
    try {
        const { store_name, address, contact_info, owner_id } = req.body;
        const result = await pool.query(
            "INSERT INTO medical_stores (store_name, address, contact_info, owner_id) VALUES ($1, $2, $3, $4) RETURNING *",
            [store_name, address, contact_info, owner_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;