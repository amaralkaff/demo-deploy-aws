'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company.hasMany(models.Job, { foreignKey: 'companyId' })
    }
  }
  Company.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Company name cannot be empty'
        },
        notNull: {
          msg: 'Company name cannot be null'
        }
      }
    },
    companyLogo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Company logo cannot be empty'
        },
        notNull: {
          msg: 'Company logo cannot be null'
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Location cannot be empty'
        },
        notNull: {
          msg: 'Location cannot be null'
        }
      }
    },
    email: DataTypes.STRING,
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Description cannot be empty'
        },
        notNull: {
          msg: 'Description cannot be null'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};