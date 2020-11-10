"use strict";

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

    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "John Doe",
          email: "john@email.com",
          uuid: "42b0b076-6f58-4c97-ba38-c02b8e6a2707",
          role: "admin",
          createdAt: '2020-11-10T06:25:25.554Z',
          updatedAt: '2020-11-10T06:25:25.554Z',
        },
        {
          name: "Jane Doe",
          email: "jane@email.com",
          uuid: "42b0b076-6f58-4c97-ba38-c02b8e6ae1207",
          role: "admin",
          createdAt: '2020-11-10T06:25:25.554Z',
          updatedAt: '2020-11-10T06:25:25.554Z',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('users', null, {});
     */
     await queryInterface.bulkDelete('users', null, {});
  },
};
