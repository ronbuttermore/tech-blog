const router = require('express').Router();
const { Comment } = require('../../models');

router.get('/', async (req, res) => {
    const commentData = await Comment.findAll();
    res.json(commentData);
});

router.post('/', async (req, res) => {
    const commentData = await Comment.create(req.body);
    res.json(commentData);
});

router.get('/:id', async (req, res) => {
    try {
      const commentData = await Comment.findByPk(req.params.id);
      res.json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;