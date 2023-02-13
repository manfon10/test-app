import { QueryInterface } from "sequelize";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    queryInterface.bulkInsert(
      "menu_slugs",
      [
        {
          name: "Empresas",
          slug: "companies",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Revisar Contenido",
          slug: "review-content",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Soporte Empresas",
          slug: "business-support",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Reportes",
          slug: "reports",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete("menu_slugs", {}, {});
  },
};
