'use strict';

/** @type {import('sequelize-cli').Migration} */


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Events', 'UserId', 'userId');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('Events', 'userId', 'UserId');
  }
};
