const bcrypt = require('bcrypt');
const { User, Company } = require('../models');

const seedDefaultUsers = async () => {
  try {
    // Create default company
    let company = await Company.findOne({ where: { name: 'Default Company' } });
    if (!company) {
      company = await Company.create({
        name: 'Default Company',
        address: '123 Default St',
        contactEmail: 'contact@defaultcompany.com',
      });
    }

    // Default users data
    const users = [
      { username: 'admin', email: 'admin@default.com', role: 'admin', companyId: null },
      { username: 'sagar_technician', email: 'sagar_tech@default.com', role: 'technician', companyId: company.id },
      { username: 'sagar_customer', email: 'sagar_customer@default.com', role: 'customer', companyId: company.id },
    ];

    for (const userData of users) {
      const existingUser = await User.findOne({ where: { email: userData.email } });
      if (!existingUser) {
        const passwordHash = await bcrypt.hash('sagar', 10);
        await User.create({ ...userData, passwordHash });
      }
    }

    console.log('Default users seeded');
  } catch (error) {
    console.error('Error seeding default users:', error);
  }
};

module.exports = seedDefaultUsers;
