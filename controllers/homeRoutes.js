const router = ('express').Router();
const { User, Comment, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        res.render('homepage', {
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//Single post
router.get('/post/:id', async (req, res) => {
    try {
        const singlePost = await Post.findByPk(req.params.id, {
            include: [
                User,
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });

        if (singlePost) {
            const post = singlePost({ plain: true });
            res.render('single-post', { post });

        } else {
            res.status(500).json(err);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//Signup page
router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('signup');
});

//Login Page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

module.exports = router;