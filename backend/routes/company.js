const express = require('express');
const { Company } = require('../models');
const { authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin only routes
router.use(authorizeRoles('admin'));

// Create a new company
router.post('/', async (req, res) => {
  try {
    const { name, address, contactEmail } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Company name is required' });
    }
    const existing = await Company.findOne({ where: { name } });
    if (existing) {
      return res.status(409).json({ message: 'Company already exists' });
    }
    const company = await Company.create({ name, address, contactEmail });
    res.status(201).json(company);
  } catch (error) {
    console.error('Create company error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all companies
router.get('/', async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (error) {
    console.error('Get companies error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get company by id
router.get('/:id', async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json(company);
  } catch (error) {
    console.error('Get company error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update company
router.put('/:id', async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    const { name, address, contactEmail } = req.body;
    await company.update({ name, address, contactEmail });
    res.json(company);
  } catch (error) {
    console.error('Update company error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete company
router.delete('/:id', async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    await company.destroy();
    res.json({ message: 'Company deleted' });
  } catch (error) {
    console.error('Delete company error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
