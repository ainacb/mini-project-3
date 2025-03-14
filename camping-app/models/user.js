const { DataTypes, Model } = require("sequelize");
let dbConnect = require("../lib/dbConnect");

const sequelizeInstance = dbConnect.Sequelize;

class User extends Model {}

User.init(
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    first_name: { type: DataTypes.STRING(50), allowNull: false },
    last_name: { type: DataTypes.STRING(50), allowNull: false },
    username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    profile_pic: { type: DataTypes.STRING(500), allowNull: true },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    social_links: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: sequelizeInstance,
    modelName: "users", // lowercase plural format
    timestamps: false, // Using explicit created_at instead
    freezeTableName: true,
  }
);

module.exports = User;
