const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Blog = require('./Blog');
const User = require('./User');

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        blog_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'blog',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize: sequelize,
        timestamps: true,
        freezeTableName: true,
        modelName: 'comment'
    }
);

module.exports = Comment;