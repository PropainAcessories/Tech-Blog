const { Post, User, Comment } = require('../../models');

const router = require('express').Router();

const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
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

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'content', 'title'],
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
    }]
    });
        if (!postData) {
        res.status(404).json({ message: 'No post found try again.' });
        return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update({
            title: req.body.title,
            content: req.body.content
        },
        {
            where: {
                id: req.params.id
            }
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found try again.' });
            return;
        }

        res.status(200).json(postData);  
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id
            }
        })

        if (!postData) {
            res.status(404).json({ message: 'No post found try again.' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;
