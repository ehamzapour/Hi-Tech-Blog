const router = require('express').Router();
const { Comment } = require('../../models/Comment');
const withAuth = require('../../utils/auth');

//Creates comment
router.post('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            commentBody: req.body.commentBody,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        });

        res.status(200).json(commentData)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll();

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!'});
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findbyPK({
            where: {
                id: req.params.id
            }
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!'});
            return;
        }

        res.status(200).json(commentData)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.update(
        {
            commentBody: req.body.commentBody
        },
        {
            where: {
                id: req.params.id
            }
        }
    );

    if (!commentData) {
        res.status(404).json({ message: 'No comment found!'});
        return;
    }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.delete('/:id', withAuth, async (req,res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!'});
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;