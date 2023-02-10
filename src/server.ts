import "dotenv/config";

import { Error } from "sequelize";

import app from "./app";
import { sequelize } from "./database/models";

const PORT = process.env.APP_PORT || 4000;

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);

  sequelize
    .sync({ force: false })
    .then(() => {
      console.log(`Database Conected!`);
    })
    .catch((error: Error) => {
      console.log(error);
    });
});
