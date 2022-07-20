'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.addColumn('Orders', 'product_name', Sequelize.STRING, {});
     await queryInterface.addColumn('Orders', 'base_price', Sequelize.INTEGER,{});
     await queryInterface.addColumn('Orders', 'image_product', Sequelize.STRING, {});
     await queryInterface.addColumn('Orders', 'transaction_date', Sequelize.DATE, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeColumn('Orders', 'product_name', {});
     await queryInterface.removeColumn('Orders', 'base_price', {});
     await queryInterface.removeColumn('Orders', 'image_product', {});
     await queryInterface.removeColumn('Orders', 'transaction_date', {});
     
  }
};
