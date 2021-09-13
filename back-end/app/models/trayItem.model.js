module.exports = (sequelize, Sequelize) => {
    const trayItem = sequelize.define('trayItems', {
        quantity: {
            type: Sequelize.INTEGER,
        },
        formId: {
          type: Sequelize.INTEGER,
      },
        rackId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {         
              model: 'racks',
              key: 'id'
            },
            onUpdate:'Cascade',
            onDelete:'Cascade',
          },
          trayId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {         
              model: 'trays',
              key: 'id'
            },
            onUpdate:'Cascade',
            onDelete:'Cascade',
          },

          tempId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {         
              model: 'templates',
              key: 'id'
            }
        },

    });

    trayItem.associate = (models) => {
        trayItem.belongsTo(models.Rack, { foreignKey: 'rackId', as: 'rack' })
    };

    trayItem.associate = (models) => {
        trayItem.belongsTo(models.Tray, { foreignKey: 'trayId', as: 'tray' })
    };

    trayItem.associate = (models) => {
      trayItem.belongsTo(models.Item, { foreignKey: 'tempId', as: 'template' })
  };

    

    return trayItem;
}