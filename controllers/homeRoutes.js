const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const getUser = require('../utils/helpers');

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
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/post/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['id', 'name'],
          },
          {
            model: Comment,
            attributes: ['comment', 'user_id', 'date_created'],
          },
        ],
      });

      const post = postData.get({ plain: true });

      const userData = await User.findAll();
      const users = userData.map((user) => user.get({ plain: true }));
      let commentedBy = '';
      for (i=0; i<post.comments.length; i++) {
        for (j=0; j<users.length; j++) {
          if (post.comments[i].user_id==users[j].id){
            commentedBy = users[j].name;
          }
        }
      }
      post.commentedBy = commentedBy;

      res.render('post', {
        ...post,
        logged_in: req.session.logged_in
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