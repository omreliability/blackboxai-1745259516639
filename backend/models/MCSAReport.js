module.exports = (sequelize, DataTypes) => {
  const MCSAReport = sequelize.define('MCSAReport', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    equipmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reportData: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    reportDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    uploadedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'mcsa_reports',
    timestamps: true,
  });

  MCSAReport.associate = (models) => {
    MCSAReport.belongsTo(models.Equipment, { foreignKey: 'equipmentId' });
    MCSAReport.belongsTo(models.User, { foreignKey: 'uploadedBy' });
  };

  return MCSAReport;
};
