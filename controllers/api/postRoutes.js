const router = require('express').Router();
const { Post } = require('../../models');

router.get('/', async (req, res) => {
    const postData = await Post.findAll();
    res.json(postData);
});

module.exports = router;