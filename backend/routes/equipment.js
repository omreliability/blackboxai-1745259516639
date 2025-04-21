const express = require('express');
const { Equipment } = require('../models');
const { authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin only routes for equipment management
router.use(authorizeRoles('admin'));

// Create new equipment for a company
router.post('/', async (req, res) => {
  try {
    const { companyId, name, type, description } = req.body;
    if (!companyId || !name || !type) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const equipment = await Equipment.create({ companyId, name, type, description });
    res.status(201).json(equipment);
  } catch (error) {
    console.error('Create equipment error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all equipment (optionally filter by company)
router.get('/', async (req, res) => {
  try {
    const { companyId } = req.query;
    const where = companyId ? { companyId } : {};
    const equipmentList = await Equipment.findAll({ where });
    res.json(equipmentList);
  } catch (error) {
    console.error('Get equipment error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get equipment by id
router.get('/:id', async (req, res) => {
  try {
    const equipment = await Equipment.findByPk(req.params.id);
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    res.json(equipment);
  } catch (error) {
    console.error('Get equipment error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update equipment
router.put('/:id', async (req, res) => {
  try {
    const equipment = await Equipment.findByPk(req.params.id);
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    const { name, type, description } = req.body;
    await equipment.update({ name, type, description });
    res.json(equipment);
  } catch (error) {
    console.error('Update equipment error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete equipment
router.delete('/:id', async (req, res) => {
  try {
    const equipment = await Equipment.findByPk(req.params.id);
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }
    await equipment.destroy();
    res.json({ message: 'Equipment deleted' });
  } catch (error) {
    console.error('Delete equipment error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
