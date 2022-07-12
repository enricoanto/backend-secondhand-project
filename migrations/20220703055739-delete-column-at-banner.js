'use strict';

const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.removeColumn('Banners', 'user_id', {});
     await queryInterface.removeColumn('Banners', 'image_name', {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.addColumn('Banners', 'user_id', Sequelize.INTEGER, {});
     await queryInterface.addColumn('Banners', 'image_name', Sequelize.STRING, {})
  }
};
