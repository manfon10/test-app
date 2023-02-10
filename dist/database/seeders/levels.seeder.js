"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert("levels", [
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
        ], {});
    },
    down: (queryInterface) => {
        return queryInterface.bulkDelete("levels", {}, {});
    },
};
