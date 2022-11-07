const { Comment } = require('../models');

const commentdata = [
  {
    comment: 'JS is an awesome language.',
    blog_id: 3,
    user_id: 1
  },
  {
    comment: 'Html is mostly used markup language!.',
    blog_id: 3,
    user_id: 2
  },
  {
    comment: 'Css is cool!.',
    blog_id: 3,
    user_id: 3
  }
];
const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;
