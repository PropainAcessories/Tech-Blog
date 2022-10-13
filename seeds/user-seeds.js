const { User } = require('../models');

const userData = [
    {
        id: 1,
        username: 'Blackbeard',
        password: 'StealStuffFromBoats'
    },
    {
        id: 2,
        username: 'O_Levasseur',
        password: 'YoullNeverFindIt'
    },
    {
        id: 3,
        username: 'Henry_Every',
        password: '420Pirateking69'
    },
    {
        id: 4,
        username: 'Madame_Cheng',
        password: 'RichestPirateEver'
    }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
