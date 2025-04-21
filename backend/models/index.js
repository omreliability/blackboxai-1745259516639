const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Company = require('./Company')(sequelize, Sequelize);
db.User = require('./User')(sequelize, Sequelize);
db.Equipment = require('./Equipment')(sequelize, Sequelize);
db.Parameter = require('./Parameter')(sequelize, Sequelize);
db.MCSAReport = require('./MCSAReport')(sequelize, Sequelize);
db.MotorHealthData = require('./MotorHealthData')(sequelize, Sequelize);

// Associations
db.Company.hasMany(db.User, { foreignKey: 'companyId' });
db.User.belongsTo(db.Company, { foreignKey: 'companyId' });

db.Company.hasMany(db.Equipment, { foreignKey: 'companyId' });
db.Equipment.belongsTo(db.Company, { foreignKey: 'companyId' });

db.Equipment.hasMany(db.Parameter, { foreignKey: 'equipmentId' });
db.Parameter.belongsTo(db.Equipment, { foreignKey: 'equipmentId' });

db.Equipment.hasMany(db.MotorHealthData, { foreignKey: 'equipmentId' });
db.MotorHealthData.belongsTo(db.Equipment, { foreignKey: 'equipmentId' });

db.Equipment.hasMany(db.MCSAReport, { foreignKey: 'equipmentId' });
db.MCSAReport.belongsTo(db.Equipment, { foreignKey: 'equipmentId' });

db.User.hasMany(db.MotorHealthData, { foreignKey: 'createdBy' });
db.MotorHealthData.belongsTo(db.User, { foreignKey: 'createdBy' });

db.User.hasMany(db.MCSAReport, { foreignKey: 'uploadedBy' });
db.MCSAReport.belongsTo(db.User, { foreignKey: 'uploadedBy' });

module.exports = db;
