import { QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert(
      "rols",
      [
        {
          name: "Super Admin",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Administrador",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Supervisor",
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
    return queryInterface.bulkDelete("rols", {}, {});
  },
};
