'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Dog.belongsTo(models.Profile, { foreignKey: 'ownerId' })
    }
  }
  Dog.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Profiles',
        key: 'id',
      }
    },
    age: DataTypes.STRING,
    breed: DataTypes.STRING,
    personality: DataTypes.STRING(1234),
    photo: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Dog',
  });
  return Dog;
};