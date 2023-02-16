module.exports = {
  up: async (queryInterface) => {
    queryInterface.bulkInsert(
      "menu_slugs",
      [
        {
          name: "Empresas",
          slug: "companies",
          icon: "BusinessIcon",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Revisar Contenido",
          slug: "review-content",
          icon: "PreviewIcon",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Soporte Empresas",
          slug: "business-support",
          icon: "EngineeringIcon",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Reportes",
          slug: "reports",
          icon: "AssignmentIcon",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Registros",
          slug: "registers",
          icon: "SettingsIcon",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Programa de Auditoria",
          slug: "program-audit",
          icon: "PendingActionsIcon",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Cumplimiento de Programa",
          slug: "program-complice",
          icon: "AssignmentTurnedInIcon",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Formatos de Auditoria",
          slug: "formats-audit",
          icon: "QuizIcon",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Formularios PP",
          slug: "formats-pp",
          icon: "QuizIcon",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Liberación PP/Proceso",
          slug: "release-process",
          icon: "LockOpenIcon",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Alertas de Calidad",
          slug: "quality-alerts",
          icon: "ReportProblemIcon",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Indicadores",
          slug: "indicators",
          icon: "TimelineIcon",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete("menu_slugs", {}, {});
  },
};
