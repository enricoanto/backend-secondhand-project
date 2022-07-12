'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn('Notifications', 'notification_type', Sequelize.STRING, {});
     await queryInterface.addColumn('Notifications', 'order_id', Sequelize.INTEGER, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeColumn('Notifications', 'notification_type', {});
     await queryInterface.removeColumn('Notifications', 'order_id', {});
  }
};
