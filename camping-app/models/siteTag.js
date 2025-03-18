const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../lib/dbConnect");

const sequelizeInstance = dbConnect.Sequelize;

class SiteTag extends Model {}

SiteTag.init(
  {
    site_id: {
      type: DataTypes.STRING(36), // Changed from UUID to match MySQL VARCHAR(36),
      allowNull: false,
      primaryKey: true,
      references: {
        model: "campingsites",
        key: "site_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    tag_id: {
      type: DataTypes.STRING(36), // Changed from UUID to match MySQL VARCHAR(36)
      allowNull: false,
      primaryKey: true,
      references: {
        model: "tags",
        key: "tag_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "siteTags", // lowercase with underscore format
    tableName: "sitetags",
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = SiteTag;
