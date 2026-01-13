const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 1. SIGNUP LOGIC
const signupUser = async (req, res) => {
    try {

        console.log("Data received from frontend:", req.body);
        // Destructure all fields from your React form
        const { name, email, password, role, gender, dob, phone } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, Email, and Password are required" });
        }

        // Check if user already exists
        const userExist = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userExist.rows.length > 0) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // Hash the password for security
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert into PostgreSQL (Make sure you ran the ALTER TABLE SQL command first)
        const newUser = await pool.query(
            "INSERT INTO users (name, email, password, role, gender, dob, phone) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, name, email, role",
            [name, email, hashedPassword, role || 'user', gender, dob, phone]
        );

        // Generate JWT Token
        const token = jwt.sign(
            { id: newUser.rows[0].id, role: newUser.rows[0].role },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.status(201).json({ 
            token, 
            user: newUser.rows[0],
            message: "Registration successful" 
        });

    } catch (err) {
        console.error("Signup Error:", err.message);
        res.status(500).json({ message: "Server Error: " + err.message });
    }
};

// 2. LOGIN LOGIC
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) {
            return res.status(401).json({ message: "Invalid Email or Password" });
        }

        // Compare hashed password
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid Email or Password" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user.rows[0].id, role: user.rows[0].role },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.status(200).json({
            token,
            user: {
                id: user.rows[0].id,
                name: user.rows[0].name,
                role: user.rows[0].role
            },
            message: "Login successful"
        });

    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).json({ message: "Server Error" });
    }
};

// IMPORTANT: Export both so authRoutes.js can find them
module.exports = { signupUser, loginUser };