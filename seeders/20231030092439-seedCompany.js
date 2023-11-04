"use strict";

/** @type {import('sequelize-cli').Migration} */
const fs = require("fs");
module.exports = {
  async up(queryInterface, Sequelize) {
    const companies = JSON.parse(
      fs.readFileSync("./data/company.json", "utf8")
    ).map((company) => {
      delete company.id;
      company.createdAt = new Date();
      company.updatedAt = new Date();
      return company;
    });
    await queryInterface.bulkInsert("Companies", companies, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Companies", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
