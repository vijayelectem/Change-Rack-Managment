module.exports = (sequelize, Sequelize) => {
  const Store = sequelize.define("store", {
    name: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    longitude: {
      type: Sequelize.INTEGER
    },
    lattitude: {
      type: Sequelize.INTEGER
    }
  });

  return Store;
};
