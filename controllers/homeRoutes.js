const { Post, User, Comment } = require('../models');

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
    });

    const posts = postData.map((post) => post.get({ plain: true}));

    res.render('homepage', {
        loggedIn: req.session.loggedIn,
        posts,
    });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    try {
         if (req.session.loggedIn) {
            res.redirect('/homepage');
            return;
         }
         res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/signup', (req,res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'content',
            'title',
        ],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
    {
        model: User,
        attributes: ['username']
    }]
    });
    const post = postData.get({ plain: true });
    res.render('single-post', {
         post,
        loggedIn: true 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
