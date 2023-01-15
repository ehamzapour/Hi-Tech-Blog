const router = require('express').Router();
const { Post } = require('../../models/Post');
const withAuth = require('../../utils/auth');

//Creates new post
router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Updates post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!postData[0]) {
            res.status(404).json({ message: 'No posts found with this id.'});
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Deleting post
router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!postData) {
            res.status(400).json({ message: 'No posts found with this id.'});
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;