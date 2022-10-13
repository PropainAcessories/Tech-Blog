const { Post, User, Comment } = require('../models');

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findall({
        attributes: [
            'id',
            'title',
            'content',
            'post_info'
        ],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'post_info'],
            include: {
                model: User,
                attributes: ['username']
            },
        },
        {
            model: User,
            attributes: ['username']
        }
        ]
    });

    const posts = postData.map((post) => post.get({ plain: true}));

    res.render('homepage', {
        posts,
        logged_in: req.session.logged_in,
        username: req.session.username
    });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('login', (req, res) => {
    try {
         if (req.session.logged_in) {
            res.redirect('/');
            return;
         }
         res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('./signup', (req,res) => {
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
            'post_info'
        ],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'post_info'],
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
    res.render('single-post', { post, logged_in: req.session.logged_in });

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
