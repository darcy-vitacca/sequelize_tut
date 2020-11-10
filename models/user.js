"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      this.hasMany(Post, { foreignKey: "userId", as: "posts" });
      // define association here
    }
    //each time we make a call to the user model and it return json data we can override it
    //So if we don't want this data we use this.get() and say somehting is udnefined
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
      };
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a name" },
          notEmpty: { msg: "User must have a name" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a role" },
          notEmpty: { msg: "User must have a role" },
          isEmail: { msg: "Must be a valid email address" },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a email" },
          notEmpty: { msg: "User must have a email" },
        },
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );
  return User;
};
