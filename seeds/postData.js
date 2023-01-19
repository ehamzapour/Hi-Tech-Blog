const { Post } = require('../models');

const postData = [
    {
        "title": "Fun Fact About Computer Programming",
        "post_body": "Coding has over 700 languages!",
        "user_id": 1
    }
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;