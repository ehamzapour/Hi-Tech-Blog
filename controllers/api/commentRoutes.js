const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');

//Creates comment
router.post('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            ...req.commentBody,
            user_id: req.session.user_id,
        });

        res.json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;