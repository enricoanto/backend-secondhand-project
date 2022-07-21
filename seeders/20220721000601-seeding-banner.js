'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     const data = [
      {
        "name": "lega_calcio",
        "image_url": "https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/banner%2FBAN-1656828994178-lega_calcio.png?alt=media",
        "createdAt": "2022-07-03T06:16:34.185Z",
        "updatedAt": "2022-07-03T06:16:34.185Z"
      },
      {
        "name": "la_liga",
        "image_url": "https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/banner%2FBAN-1656829026499-la_liga.jpg?alt=media",
        "createdAt": "2022-07-03T06:17:06.503Z",
        "updatedAt": "2022-07-03T06:17:06.503Z"
      },
      {
        "name": "premier_league",
        "image_url": "https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/banner%2FBAN-1656829041324-Premier_league.png?alt=media",
        "createdAt": "2022-07-03T06:17:21.328Z",
        "updatedAt": "2022-07-03T06:17:21.328Z"
      },
      {
        "name": "champions_league",
        "image_url": "https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/banner%2FBAN-1656829065552-champions_league.jpg?alt=media",
        "createdAt": "2022-07-03T06:17:45.553Z",
        "updatedAt": "2022-07-03T06:17:45.553Z"
      },
      {
        "name": "europa_league",
        "image_url": "https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/banner%2FBAN-1656829081250-europa_league.jpg?alt=media",
        "createdAt": "2022-07-03T06:18:01.251Z",
        "updatedAt": "2022-07-03T06:18:01.251Z"
      }
    ]
     await queryInterface.bulkInsert('Banners', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Banners', null, {});
  }
};
