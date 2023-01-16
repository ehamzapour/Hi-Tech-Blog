const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const sequelize = require('../config/connection');

router.get('/', async (req, res) => {
    try {
        const postData = await Post. findAll({
            attributes: ['id', 'title', 'postBody', 'dateCreated'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'commentBody', 'post_id', 'user_id', 'dateCreated'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                },
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        }); 

        const posts = postData.map(post => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//Single post
router.get('/post/:id', async (req, res) => {
    try {
        const singlePost = await Post.findByOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'title', 'postBody', 'dateCreated'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'commentBody', 'post_id', 'user_id', 'dateCreated'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                },
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        });

        if (!singlePost) {
            res.status(404).json({ message: 'No post found with this id!'});
            return;
        }
            const post = singlePost({ plain: true });

            res.render('single-post', {
                post,
                logged_in: req.session.logged_in
            })
    } catch (err) {
        res.status(500).json(err);
    }
});

//Signup page
router.get('/signup', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

//Login Page
router.get('/login', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('edit/:id', async (req, res) => {
    try {
        const singlePost = await Post.findByPk(req.params.id);

        const post = singlePost.get({ plain: true });

        res.render('editpost', {
            post: post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;