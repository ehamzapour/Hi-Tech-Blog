const { User } = require('../models');

const userData = [
    {
        "username": "Sally",
        "email": "sally@gmail.com",
        "password": "password123"
    },
    {
        "username": "Molly",
        "email": "molly@gmail.com",
        "password": "password123"
    },
    {
        "username": "Billy",
        "email": "billy@gmail.com",
        "password": "password123"
    }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;