module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
  }, {
    tableName: 'companies',
    timestamps: true,
  });

  Company.associate = (models) => {
    Company.hasMany(models.User, { foreignKey: 'companyId' });
    Company.hasMany(models.Equipment, { foreignKey: 'companyId' });
  };

  return Company;
};
