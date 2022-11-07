const sequelize = require('../config/connection');
const { Blog } = require('../models');

const blogdata =
 [
    {
        title: 'Java',
        content: 'Place of javascript in web',
        user_id: 1
    },
    {
        title: 'Html',
        content: 'What is Html',
        user_id: 2
    },
    {
        title: 'Css',
        content: 'Using css to style our page',
        user_id: 3
    },
    {
        title: 'Template engine',
        content: 'Using handlebars as templates engin',
        user_id: 4
    },
    {
        title: 'Server',
        content: 'Using express as server',
        user_id: 3
    }
]


const seedBlogs = () => Blog.bulkCreate(blogdata);

module.exports = seedBlogs;


