const { Model, DataTypes } = require("sequelize");

const sequelize = require(".");
const RolMenuSlug = require("./rol-menu-slug.model");

class MenuSlug extends Model {}

MenuSlug.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    slug: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    slug_root: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    icon: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize,
  }
);

MenuSlug.hasMany(RolMenuSlug, {
  foreignKey: "menu_slug_id",
  onDelete: "cascade",
});
RolMenuSlug.belongsTo(MenuSlug, {
  as: "menu_slug",
  foreignKey: "menu_slug_id",
});

module.exports = MenuSlug;
