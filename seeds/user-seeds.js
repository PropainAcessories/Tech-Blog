const { User } = require('../models');

const userData = [
    {
        username: 'Blackbeard',
        password: 'StealStuffFromBoats'
    },
    {
        username: 'O_Levasseur',
        password: 'YoullNeverFindIt'
    },
    {
        username: 'Henry_Every',
        password: '420Pirateking69'
    },
    {
        username: 'Madame_Cheng',
        password: 'RichestPirateEver'
    }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
