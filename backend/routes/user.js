const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin only routes
router.use(authorizeRoles('admin'));

// Create a new user for a company
router.post('/', async (req, res) => {
  try {
    const { username, email, password, role, companyId } = req.body;
    if (!username || !email || !password || !role || !companyId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, passwordHash, role, companyId });

    res.status(201).json({ message: 'User created', userId: user.id });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all users (optionally filter by company)
router.get('/', async (req, res) => {
  try {
    const { companyId } = req.query;
    const where = companyId ? { companyId } : {};
    const users = await User.findAll({ where });
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user by id
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update user (excluding password)
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const { username, email, role, companyId } = req.body;
    await user.update({ username, email, role, companyId });
    res.json(user);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
