module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert(
      "permissions",
      [
        {
          name: "Crear empresa",
          rol_id: 1,
          menu_slug_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Editar empresa",
          rol_id: 1,
          menu_slug_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Eliminar empresa",
          rol_id: 1,
          menu_slug_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Actualizar empresa",
          rol_id: 1,
          menu_slug_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Visualizar contenido",
          rol_id: 1,
          menu_slug_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Eliminar contenido",
          rol_id: 1,
          menu_slug_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Ver tickets empresas",
          rol_id: 1,
          menu_slug_id: 3,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Crear reporte",
          rol_id: 1,
          menu_slug_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Eliminar reporte",
          rol_id: 1,
          menu_slug_id: 4,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete("permissions", {}, {});
  },
};
