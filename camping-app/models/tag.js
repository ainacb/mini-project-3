const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../lib/dbConnect");

const sequelizeInstance = dbConnect.Sequelize;

class Tag extends Model {}

Tag.init(
  {
    tag_id: {
      type: DataTypes.STRING(36), // Changed from UUID to match MySQL VARCHAR(36)
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    tag_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "tags", // lowercase plural format
    timestamps: false, // No created_at or updated_at fields
    freezeTableName: true,
  }
);

module.exports = Tag;
