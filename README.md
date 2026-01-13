# CarePulse — Healthcare Management System

CarePulse is a full-stack healthcare platform designed to streamline the interaction between Patients, Doctors, and Medical Stores. It features a robust Admin Dashboard for managing records and a User portal for searching medical specialists.

## 🚀 Features

### Admin Portal
* **Manage Doctors & Stores**: Full CRUD operations for medical professionals and shop locations.
* **Smart Linking**: Assign doctors to specific medical stores with consultation fees and schedules.
* **Patient Records**: Securely manage and view patient history.
* **Auto-Logout**: Enhanced security with session timeout after periods of inactivity.

### Store Portal
* **Inventory Management**: Specialized dashboard for store owners to manage available services.
* **Owner-Specific Data**: Stores are linked to specific users with the 'store' role via email identification.

### User Portal
* **Advanced Search**: Find doctors by name or specialty using a modern, mobile-responsive card grid.
* **Real-time Availability**: View which medical store a doctor is currently visiting.

## 🛠️ Tech Stack

**Frontend:** React.js, React Router, CSS3 (Mobile-First Design)  
**Backend:** Node.js, Express.js  
**Database:** PostgreSQL  
**Authentication:** JSON Web Tokens (JWT) & Bcrypt password hashing

### 📱 Mobile Access
To access the app on your mobile device within the same network:
1.Ensure your laptop and phone are on the same WiFi.
2.Find your local IP (e.g., 10.27.39.61).
3.Open http://<your-ip>:3000 in your mobile browser.

### 🔒 Security
1.JWT Authentication: Protected routes ensure only authorized roles (Admin/Store) can access dashboards.
2.Auto-Logout: Inactivity timer defaults to 15 minutes to protect sensitive medical data.

### `Clone the repository`
git clone git@github.com:Ranadhir-das/Care-Pulse.git
cd Care-Pulse

### `Database Setup`
CREATE TABLE users (...);
CREATE TABLE medical_stores (...);
CREATE TABLE doctors (...);
CREATE TABLE store_doctors (...);


### `Backend Setup`
cd server
npm install

# Create a .env file with your DB_USER, DB_PASSWORD, and JWT_SECRET
node index.js

### `Frontend Setup`
cd medical  
npm install
npm start

Built with ❤️ for a healthier community.