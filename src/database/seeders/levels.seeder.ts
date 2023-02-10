import { QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert(
      "levels",
      [
        {
          name: "Nivel 1",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Nivel 2",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Nivel 3",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("levels", {}, {});
  },
};
