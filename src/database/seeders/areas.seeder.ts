import { QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert(
      "areas",
      [
        {
          name: "Administrativo",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Supervisión",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Calidad",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("areas", {}, {});
  },
};
