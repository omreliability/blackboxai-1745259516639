module.exports = (sequelize, DataTypes) => {
  const MotorHealthData = sequelize.define('MotorHealthData', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    equipmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    parameterData: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'motor_health_data',
    timestamps: true,
  });

  MotorHealthData.associate = (models) => {
    MotorHealthData.belongsTo(models.Equipment, { foreignKey: 'equipmentId' });
    MotorHealthData.belongsTo(models.User, { foreignKey: 'createdBy' });
  };

  return MotorHealthData;
};
