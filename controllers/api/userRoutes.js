const { Post, User, Comment } = require('../../models');

const router = require('express').Router();


router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] }
        });

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            },
            include: [{
                model: Post,
                attributes: ['id', 'title', 'content', 'post_info']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_info'],
                include: {
                    model: Post,
                    attributes: ['title'],
                }          
            },
            {
                model: Post,
                attributes: ['title'],
            }
        ]
        });

        if (!userData) {
            res.status(404).json({ message: 'No user found; please check your search.' });
            return;
        }
        res.status(200).json(userData);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect login.' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect login.' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.json({ user: userData, message: 'Welcome.' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
