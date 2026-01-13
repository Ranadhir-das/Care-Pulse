const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const storeRoutes = require('./routes/storeRoutes');
const storeDoctorRoutes = require('./routes/storeDoctorRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// ROUTE REGISTRATION - Double check these paths
app.use('/api/auth', authRoutes);     // This handles /api/auth/patients
app.use('/api/doctors', doctorRoutes); // This handles /api/doctors/count and /api/doctors/all
app.use('/api/stores', storeRoutes);
app.use('/api/store-doctors', storeDoctorRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));