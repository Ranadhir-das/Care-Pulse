const express = require('express');
const router = express.Router();
const pool = require('../db');
const { verifyAdmin } = require('../middleware/authMiddleware');

// 1. ADD a new doctor
router.post('/add', verifyAdmin, async (req, res) => {
    try {
        const { name, specialization, disease_expertise } = req.body;
        const newDoctor = await pool.query(
            "INSERT INTO doctors (name, specialization, disease_expertise) VALUES ($1, $2, $3) RETURNING *",
            [name, specialization, disease_expertise]
        );
        res.status(201).json(newDoctor.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

// 2. GET total count for Admin Dashboard
router.get('/count', async (req, res) => {
    try {
        const result = await pool.query("SELECT COUNT(*) FROM doctors");
        res.json({ count: result.rows[0].count });
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
});

// 3. GET all doctors (This matches your frontend call to /api/doctors/all)
router.get('/all', async (req, res) => {
    try {
        // Simple query so doctors show up in the manage table immediately
        const result = await pool.query("SELECT * FROM doctors ORDER BY name ASC");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

// 4. GET linked doctors (Keep your search logic for the patient side)
router.get('/search', async (req, res) => {
    try {
        const query = `
            SELECT d.name, d.specialization, s.store_name, s.address, sd.consultation_fee, sd.available_days
            FROM doctors d
            JOIN store_doctors sd ON d.id = sd.doctor_id
            JOIN medical_stores s ON s.id = sd.store_id
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// server/routes/doctorRoutes.js

// DELETE a doctor
// Ensure the path is exactly '/:id'
router.delete('/:id', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Attempting to delete doctor with ID:", id); // LOG THIS

        const result = await pool.query("DELETE FROM doctors WHERE id = $1", [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Doctor not found in database" });
        }

        res.json({ message: "Doctor deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;