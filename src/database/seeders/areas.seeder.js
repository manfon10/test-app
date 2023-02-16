module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert(
      "areas",
      [
        {
          name: "Super Admins",
          created_at: new Date(),
          updated_at: new Date(),
        },
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
  down: (queryInterface) => {
    return queryInterface.bulkDelete("areas", {}, {});
  },
};
