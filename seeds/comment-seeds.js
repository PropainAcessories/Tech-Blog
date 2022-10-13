const { Comment } = require('../models');

const commentData = [
    {
        id: 1,
        comment_text: "Don't make a web-powered toaster.",
        user_id: 4,
        post_id: 1,
    },
    {
        id: 2,
        comment_text: "I died when you were a baby; and I code in C++",
        user_id: 3,
        post_id: 2,
    },
    {
        id: 3,
        comment_text: "I buried a bunch of shit; if you figure out the paper I wrote it's yours.",
        user_id: 2,
        post_id: 3,
    },
    {
        id: 4,
        comment_text: "Can I buy the head?",
        user_id: 1,
        post_id: 4,
    },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
