const router = require('express').Router();
const { Post, User } = require('../models');

router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [
            {
              model: User,
              attributes: ['name'],
            },
        ],
    });
  
      const posts = postData.map((post) => post.get({ plain: true }));
  
      res.render('homepage', { 
        posts, 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/dashboard', async (req, res) => {
    res.render('dashboard');
});

router.get('/login', async (req, res) => {
    res.render('login');
});

module.exports = router;