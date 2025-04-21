# Reliability - Motor and Pump Health Monitoring Application

This is a full-stack web application for monitoring the health of motors, pumps, blowers, and gearboxes. It provides real-time dashboards, user management, PDF report generation, and secure multi-tenant access.

---

## Features

- User authentication with JWT and role-based access control (Admin, Technician, Customer)
- Company and user management (Admin only)
- Equipment management and monitoring
- Real-time dashboards with charts for Pumps, Motors, Blowers, and Gearbox
- User profile management with password change
- Export equipment performance reports as PDF
- Responsive and branded frontend UI using React and Tailwind CSS

---

## Technology Stack

- Backend: Node.js, Express, Sequelize ORM, PostgreSQL (or other SQL DB)
- Frontend: React, React Router, Tailwind CSS, Chart.js
- Authentication: JWT
- PDF Generation: PDFKit

---

## Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn
- PostgreSQL or compatible SQL database
- Git (optional)

---

## Installation and Setup

### Backend Setup

1. Clone the repository (if applicable) or download the source code.

2. Navigate to the backend directory:

   ```bash
   cd backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the `backend` directory with the following environment variables:

   ```
   PORT=5000
   DATABASE_URL=your_database_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

   Replace `your_database_connection_string` with your actual database connection string, e.g., `postgres://user:password@localhost:5432/dbname`.

   Replace `your_jwt_secret_key` with a secure secret key for JWT signing.

5. Run database migrations and seed default users:

   The server automatically syncs the database and seeds default users on startup.

6. Start the backend server:

   ```bash
   npm start
   ```

   The backend API will be available at `http://localhost:5000`.
