'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsTo(models.Company, { foreignKey: 'companyId' })
      Job.belongsTo(models.User, { foreignKey: 'authorId' })
    }
  }

  Job.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title cannot be empty'
        },
        notNull: {
          msg: 'Title cannot be null'
        }
      }
    },
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
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Image URL cannot be empty'
        },
        notNull: {
          msg: 'Image URL cannot be null'
        }
      }
    },
    jobType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Job type cannot be empty'
        },
        notNull: {
          msg: 'Job type cannot be null'
        }
      }
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Company ID cannot be empty'
        },
        notNull: {
          msg: 'Company ID cannot be null'
        }
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Author ID cannot be empty'
        },
        notNull: {
          msg: 'Author ID cannot be null'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};