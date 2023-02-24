require("dotenv").config();

const app = require("./app");
const sequelize = require("./models");

const PORT = process.env.APP_PORT || 4000;

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);

  sequelize
    .sync({
      force: false,
      alter: true,
    })
    .then(() => {
      console.log(`Database Conected!`);
    })
    .catch((error) => {
      console.log(`Database error ${error}`);
    });
});
