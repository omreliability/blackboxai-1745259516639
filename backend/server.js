require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const companyRoutes = require('./routes/company');
const userRoutes = require('./routes/user');
const equipmentRoutes = require('./routes/equipment');
const motorHealthRoutes = require('./routes/motorHealth');
const pdfReportRoutes = require('./routes/pdfReport');
const { authenticateToken } = require('./middleware/authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/companies', authenticateToken, companyRoutes);
app.use('/api/users', authenticateToken, userRoutes);
app.use('/api/equipment', authenticateToken, equipmentRoutes);
app.use('/api/motor-health', authenticateToken, motorHealthRoutes);
app.use('/api/pdf-report', authenticateToken, pdfReportRoutes);

app.get('/', (req, res) => {
  res.send('Motor and Pump Health Monitoring Backend API');
});

const seedDefaultUsers = require('./seeders/defaultUsers');

// Sync database and start server
sequelize.sync({ alter: true })
  .then(async () => {
    console.log('Database synced');
    await seedDefaultUsers();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to sync database:', err);
  });
