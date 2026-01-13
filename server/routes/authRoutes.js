const express = require('express');
const router = express.Router();
const pool = require('../db');

const { signupUser, loginUser } = require('../controllers/authController');

router.post('/signup', signupUser);
router.post('/login', loginUser); 

router.get('/patients', async (req, res) => {
    try {
        const patients = await pool.query(
            "SELECT id, name, email, phone, gender, dob FROM users WHERE role = 'user' ORDER BY id DESC"
        );
        // Always send a JSON response
        res.status(200).json(patients.rows); 
    } catch (err) {
        console.error("DB Error:", err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;