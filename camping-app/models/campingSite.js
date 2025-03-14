const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../lib/dbConnect");

const sequelizeInstance = dbConnect.Sequelize;

class CampingSite extends Model {}

CampingSite.init(
  {
    site_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(225),
      allowNull: false,
    },
    coordinates: {
      type: DataTypes.GEOMETRY("POINT"),
      allowNull: false,
    },
    average_rating: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "campingSites", // lowercase plural format
    tableName: "campingsites",
    timestamps: false, // Using explicit created_at and updated_at
    freezeTableName: true,
  }
);

module.exports = CampingSite;
