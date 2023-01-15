const router = require('express').Router();
const sequelize = require ('../config/connection');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

//Find all posts
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepeage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/create', withAuth, async (req, res) => {
    try {
        const createPost = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
        });

        const newPost = createPost.map(post => post.get({ plain: true }));

        res.render('create-post', {
            newPost,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err)
    }
});

//Edit single post
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.findByPk(req.params.id);

        if (updatedPost) {
            const post = updatedPost.get({ plain: true });

            res.render('editpost', {
                layout: "dashboard",
                post,
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;