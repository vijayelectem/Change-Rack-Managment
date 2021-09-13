module.exports = (sequelize, Sequelize) => {
	const Store = sequelize.define('store', {	
	  storeId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
      },
	  storeName: {
			type: Sequelize.STRING
	  },
	  location: {
		type: Sequelize.STRING
  	  },
		client_fk: {
			type: Sequelize.INTEGER,
			allowNull: true,
			references: {         
			  model: 'clients',
			  key: 'id'
			}
		  },
	});

	Store.associate = (models) => {
		Store.belongsTo(models.Client, { foreignKey: 'client_fk', as: 'client' })
	};
	
	Store.associate = function (models) {
		Store.hasMany(models.Rack, { as: 'rack' })
	};
	return Store;
}