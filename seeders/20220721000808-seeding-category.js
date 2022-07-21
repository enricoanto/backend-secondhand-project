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
      
      "name": "Elektronik",
      "createdAt": "2022-07-03T14:52:26.765Z",
      "updatedAt": "2022-07-03T14:52:26.765Z"
    },
    {
      
      "name": "Komputer dan Aksesoris",
      "createdAt": "2022-07-03T14:52:51.500Z",
      "updatedAt": "2022-07-03T14:52:51.500Z"
    },
    {
     
      "name": "Handphone dan Aksesoris",
      "createdAt": "2022-07-03T14:53:11.741Z",
      "updatedAt": "2022-07-03T14:53:11.741Z"
    },
    {
     
      "name": "Pakaian Pria",
      "createdAt": "2022-07-03T14:53:53.298Z",
      "updatedAt": "2022-07-03T14:53:53.298Z"
    },
    {
     
      "name": "Sepatu Pria",
      "createdAt": "2022-07-03T14:54:00.759Z",
      "updatedAt": "2022-07-03T14:54:00.759Z"
    },
    {
      
      "name": "Tas Pria",
      "createdAt": "2022-07-03T14:54:10.129Z",
      "updatedAt": "2022-07-03T14:54:10.129Z"
    },
    {
    
      "name": "Aksesoris Fashion",
      "createdAt": "2022-07-03T14:54:34.033Z",
      "updatedAt": "2022-07-03T14:54:34.033Z"
    },
    {
     
      "name": "Kesehatan",
      "createdAt": "2022-07-03T14:54:57.788Z",
      "updatedAt": "2022-07-03T14:54:57.788Z"
    },
    {
      
      "name": "Hobi dan Koleksi",
      "createdAt": "2022-07-03T14:55:21.298Z",
      "updatedAt": "2022-07-03T14:55:21.298Z"
    },
    {
     
      "name": "Makanan dan Minuman",
      "createdAt": "2022-07-03T14:55:32.163Z",
      "updatedAt": "2022-07-03T14:55:32.163Z"
    },
    {
      "name": "Perawatan dan Kecantikan",
      "createdAt": "2022-07-03T14:55:53.199Z",
      "updatedAt": "2022-07-03T14:55:53.199Z"
    },
    {
     
      "name": "Perlengkapan Rumah",
      "createdAt": "2022-07-03T14:56:12.932Z",
      "updatedAt": "2022-07-03T14:56:12.932Z"
    },
    {
      
      "name": "Pakaian Wanita",
      "createdAt": "2022-07-03T14:56:24.779Z",
      "updatedAt": "2022-07-03T14:56:24.779Z"
    },
    {
      
      "name": "Fashion Muslim",
      "createdAt": "2022-07-03T14:56:36.253Z",
      "updatedAt": "2022-07-03T14:56:36.253Z"
    },
    {
      "name": "Fashion bayi dan Anak",
      "createdAt": "2022-07-03T14:56:55.915Z",
      "updatedAt": "2022-07-03T14:56:55.915Z"
    },
    {
      "name": "Ibu dan Bayi",
      "createdAt": "2022-07-03T14:57:12.223Z",
      "updatedAt": "2022-07-03T14:57:12.223Z"
    },
    {
      "name": "Sepatu Wanita",
      "createdAt": "2022-07-03T14:57:22.728Z",
      "updatedAt": "2022-07-03T14:57:22.728Z"
    },
    {
      "name": "Tas Wanita",
      "createdAt": "2022-07-03T14:57:36.667Z",
      "updatedAt": "2022-07-03T14:57:36.667Z"
    },
    {
      "name": "Otomotif",
      "createdAt": "2022-07-03T14:57:52.377Z",
      "updatedAt": "2022-07-03T14:57:52.377Z"
    },
    {
      "name": "Olahraga dan Outdoor",
      "createdAt": "2022-07-03T14:58:28.535Z",
      "updatedAt": "2022-07-03T14:58:28.535Z"
    },
    {
      "name": "Buku dan Alat Tulis",
      "createdAt": "2022-07-03T14:58:45.222Z",
      "updatedAt": "2022-07-03T14:58:45.222Z"
    },
    {
      "name": "Voucher",
      "createdAt": "2022-07-03T14:58:59.091Z",
      "updatedAt": "2022-07-03T14:58:59.091Z"
    },
    {
      "name": "Souvenir dan Pesta",
      "createdAt": "2022-07-03T14:59:34.277Z",
      "updatedAt": "2022-07-03T14:59:34.277Z"
    },
    {
      "name": "Fotografi",
      "createdAt": "2022-07-03T14:59:47.372Z",
      "updatedAt": "2022-07-03T14:59:47.372Z"
    }
  ]
  await queryInterface.bulkInsert('Categories', data, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Categories', null, {});
  }
};
