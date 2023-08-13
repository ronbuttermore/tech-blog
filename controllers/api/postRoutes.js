const router = require('express').Router();

router.get('/', async (req, res) => {
    const postData = await postData.findAll();
    res.json(postData);
});

module.exports = router;