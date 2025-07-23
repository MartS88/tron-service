'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      tx_hash: {
        type: Sequelize.STRING(128),
        allowNull: false,
        unique: true,
      },
      from_address: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      to_address: {
        type: Sequelize.STRING(128),
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL(18, 6),
        allowNull: false,
      },
      confirmed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      confirmations: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      order_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'orders',
          key: 'id'
        },
        onDelete: 'SET NULL',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('transactions');
  }
};
