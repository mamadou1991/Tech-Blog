const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');

// get all users
router.get('/', (req, res) => {
    User.findAll({
      attributes: { exclude: ['password'] }
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.get('/:id', (req, res) => {
    User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Blog,
          attributes: ['id', 'title', 'content', 'user_id']
        },
        {
          model: Comment,
          attributes: ['id', 'comment', 'blog_id', 'user_id'],
    
        }
        
      ]
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// Create user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body)
        req.session.save(() => {
            req.session.user_id = userData.id,
            req.session.logged_in = true,
            res.status(200).json(userData)
        })
    } catch (err){
        res.status(400).json(err);
    }
})
// Validate sign in
router.post('/login', async (req, res) => {
    try {
        // Username verification
        const userData = await User.findOne({ where: { username: req.body.username }});
        if(!userData){
            res.status(400).json({ message: 'Incorrect username or password'})
            return;
        }
        // Password verification
        const validPassword = await userData.checkPassword(req.body.password);
        if(!validPassword){
            res.status(400).json({ message: 'Incorrect username or password'})
            return;
        }
        console.log(userData)
        const user = userData.get({ plain: true });
        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.logged_in = true;
            res.json({ user: user, message: 'You are now logged in !'})
        })
    } catch (err){
        res.status(400).json(err);
    }
});
// destroy session on logout
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})



module.exports = router;