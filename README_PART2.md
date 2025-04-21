### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000`.

---

## Default Users

The backend seeds the following default users on startup with password `sagar`:

- Admin: `admin@default.com`
- Technician: `sagar_tech@default.com`
- Customer: `sagar_customer@default.com`

Use these credentials to log in and explore the application.

---

## Usage

- Access the frontend at `http://localhost:3000`.
- Log in using one of the default users or create new users via the admin interface.
- Navigate through the equipment dashboards to view performance charts.
- Export equipment performance reports as PDF using the export button on each dashboard.
- Manage your user profile and change your password in the Profile page.
- Admin users can manage companies, users, and equipment via the backend API or future admin UI.

---

## Testing

- Backend and frontend testing can be added using Jest, React Testing Library, or other preferred tools.
- Manual testing can be done by running the application and verifying all features.

---

## Deployment

- Configure environment variables appropriately for production.
- Use process managers like PM2 for backend.
- Build the frontend for production using:

  ```bash
  npm run build
  ```

- Serve the frontend build with a static server or integrate with backend.

---

## License

This project is provided as-is without any warranty.

---

## Contact

For questions or support, please contact the development team.
