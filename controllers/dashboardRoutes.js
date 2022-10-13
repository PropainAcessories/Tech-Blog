const { Post, User, Comment } = require('../models');

const router = require('express').Router();

const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'content',
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
        }
    ]
    });
    const posts = postData.map((post) =>
        post.get({ plain: true })
    );

    res.render('dashboard', { posts, loggedIn: true, username: req.session.username });

    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try{
        const postData = await Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'content'],
        include: [{
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
    ]
    });

    if (!postData) {
        res.status(404).json({ message: 'no post with this ID' });
        return
    };

    const post = postData.get({ plain: true});
    res.render('edit-post', { post, loggedIn: true });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/new', (req, res) => {
    res.render('create-post')
});

module.exports = router;
