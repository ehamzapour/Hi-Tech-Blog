const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

//Creates new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.name = userData.name;
            req.session.logged_in = true;

            res.status(200).json(userData);
        })

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne(
            { 
                where: {
                    email: req.body.email
                }

            }
        );

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;


            res.status(200).json({ user: userData, message: 'Success! You are now logged in!' });
        })

    } catch (err) {
        res.status(400).json(err);
    }
});

//Destroy session
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] }
        });

        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                id: req.params.id
            },
            attributes: {
                exclude: ['password']
            },
            include: [
                {
                    model: Post,
                    attributes: [
                        'id', 'title', 'postBody', 'dateCreated'
                    ]
                },
                {
                    model: Comment,
                    attributes: [
                        'id', 'commentBody', 'dateCreated'
                    ],
                    include: {
                        model: Post,
                        attributes: ['title'],
                    }
                }
            ]
        });

        if(!userData) {
            res.status(404).json({message: 'No user found!'});
            return;
        }

        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;