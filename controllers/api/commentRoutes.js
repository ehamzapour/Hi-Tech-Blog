const router = require('express').Router();
const { Comment } = require('../../models/Comment');
const withAuth = require('../../utils/auth');

//Creates comment
router.post('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;