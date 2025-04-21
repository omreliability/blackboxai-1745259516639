module.exports = (sequelize, DataTypes) => {
  const Parameter = sequelize.define('Parameter', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    equipmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    thresholdMin: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    thresholdMax: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  }, {
    tableName: 'parameters',
    timestamps: true,
  });

  Parameter.associate = (models) => {
    Parameter.belongsTo(models.Equipment, { foreignKey: 'equipmentId' });
  };

  return Parameter;
};
