const { Comment } = require('../models');

const commentData = [
    {
        "user_id": 1,
        "post_id": 1,
        "comment_body": "Javascript is so cool"
    }
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;