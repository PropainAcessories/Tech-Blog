const { Post } = require('../models');

const postData = [
    {
        title: 'Jquery vs Vanilla Javascript; why vanilla JS is better.',
        content: 'Advantages and disadvantages of JQuery libraries',
        user_id: 1
    },
    {
        title: 'What type of development does everyone do?',
        content: "Personally I do none because I'm from the 1700's",
        user_id: 2
    },
    {
        title: 'Does anyone know about any job opportunities?',
        content: "I don't need one due to piracy, but it's nice to have a retirement plan.",
        user_id: 3
    },
    {
        title: 'Where are the wizards that understand the box this thing called a "time traveller" gave me?',
        content: "Tell me or I'm cutting off his head!",
        user_id: 4
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
