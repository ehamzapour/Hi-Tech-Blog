const sequelize = require('../../config/connection');
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            attributes: ['id', 'title', 'postBody', 'dateCreated'],
            order: [['dateCreated', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    attributes: ['id', 'commentBody', 'post_id', 'user_id', 'dateCreated'],
                    include: [
                        {
                            model: User,
                            attributes: ['name']
                        }
                    ]
                }
            ]
        })

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'title', 'postBody', 'dateCreated'],
            order: [['dateCreated', 'DESC']],
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    attributes: ['id', 'commentBody', 'post_id', 'user_id', 'dateCreated'],
                    include: [
                        {
                            model: User,
                            attributes: ['name']
                        }
                    ]
                }
            ]
        });

        if (!postData) {
            res.status(404).json({ message: 'No posts found with this id!'});
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Creates new post
router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            user_id: req.session.user_id,
            postBody: req.body.postBody
        });

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Updates post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update(
            {
                title: req.body.title,
                postBody: req.body.postBody
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );

        if (!postData) {
            res.status(404).json({ message: 'No posts found with this id.'});
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Deleting post
router.delete('/:id', withAuth, async (req, res) => {
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