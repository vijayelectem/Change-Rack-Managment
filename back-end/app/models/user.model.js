module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.BIGINT
    },
    location: {
      type: Sequelize.STRING
    },
    status:{
      type:Sequelize.STRING,
      defaultValue:"REGISTERED"
    },
    esUrl:{
      type:Sequelize.STRING,
    },
    clientFk: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {         
        model: 'clients',
        key: 'id'
      }
    },
    storeFk: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {         
        model: 'users',
        key: 'id'
      }
    },
  }, {});

  User.associate = (models) => {
    User.belongsTo(models.Client, { foreignKey: 'clientFk', as: 'client' })
};

User.associate = (models) => {
  User.belongsTo(models.Store, { foreignKey: 'storeFk', as: 'user' })
};

User.associate = (models) => {
  User.belongsTo(models.Role, {
    foreignKey: 'roleId',
    as: 'role'
  })
};

  return User;
};
