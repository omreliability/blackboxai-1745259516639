const express = require('express');
const { MotorHealthData } = require('../models');
const { authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Technicians and customers can access motor health data for their company
router.use(authorizeRoles('admin', 'technician', 'customer'));

// Create new motor health data entry (technician only)
router.post('/', authorizeRoles('technician'), async (req, res) => {
  try {
    const { equipmentId, parameterData, timestamp } = req.body;
    if (!equipmentId || !parameterData) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const createdBy = req.user.id;
    const data = await MotorHealthData.create({ equipmentId, parameterData, timestamp, createdBy });
    res.status(201).json(data);
  } catch (error) {
    console.error('Create motor health data error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get motor health data for equipment (all roles)
router.get('/equipment/:equipmentId', async (req, res) => {
  try {
    const { equipmentId } = req.params;
    const data = await MotorHealthData.findAll({
      where: { equipmentId },
      order: [['timestamp', 'DESC']],
    });
    res.json(data);
  } catch (error) {
    console.error('Get motor health data error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
