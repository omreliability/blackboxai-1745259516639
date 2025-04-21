module.exports = (sequelize, DataTypes) => {
  const Equipment = sequelize.define('Equipment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('motor', 'pump'),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'equipment',
    timestamps: true,
  });

  Equipment.associate = (models) => {
    Equipment.belongsTo(models.Company, { foreignKey: 'companyId' });
    Equipment.hasMany(models.Parameter, { foreignKey: 'equipmentId' });
    Equipment.hasMany(models.MotorHealthData, { foreignKey: 'equipmentId' });
    Equipment.hasMany(models.MCSAReport, { foreignKey: 'equipmentId' });
  };

  return Equipment;
};
