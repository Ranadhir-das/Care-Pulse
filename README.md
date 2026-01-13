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
