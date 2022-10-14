const { Comment } = require('../../models');

const router = require('express').Router();

const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
        const commentData = await Comment.findAll({
        });
        res.status(200).json(commentData);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        if (req.session) {
            const commentData = await Comment.create({
                comment_text: req.body.comment_text,
                post_id: req.body.post_id,
                user_id: req.session.user_id,
            })
            res.status(200).json(commentData);
        }
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
   try {
    const commentData = await Comment.update({
        comment_text: req.body.comment_text
    },
    {
        where: {
            id: req.params.id
        }
    })
    res.status(200).json(commentData);

   } catch (err) {
    res.status(500).json(err);
   }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!commentData) {
            res.status(404).json({ message: 'No comment found; try again.' });
            return;
        }
        res.status(200).json(commentData);

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
