const router = require('express').Router();
const { Project, User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
const axios = require('axios');
require('dotenv').config();
const apiKey = process.env.API_KEY || 'default_api_key';

router.get('/', (req, res) => {
  res.render('home', {
    // fill in later???
    // layout: 'other_main' // layouts/other_main.handlebars
  });
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login', {
        title: "Garden Bliss",
        head_title: "Login Garden Bliss",

    });
  });

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/tips', (req, res) => {
  res.render('tips');
});
  
  //will need to add a withauth
  router.get('/plantsearchresults/:name',  async (req, res) => {
    try {
      const data = await axios.get(`https://perenual.com/api/species-list?key=${apiKey}&q=${req.params.name}`);
      console.log(JSON.stringify(data.data, null, 2));
      const simpleData = JSON.parse(JSON.stringify(data.data));
      console.log(JSON.stringify(simpleData, null, 2));
      console.log(Object.keys (simpleData.data));
      res.render('plantsearch', {simpleData});
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  //withAuth, (req, res) 
  router.get('/forum/newpost/', (req, res) => {
    const username = "Greate New Post";
    const task = "new";
    res.render('forum', { loggedIn: true, username: username, task:task });
  
  });

  router.get('/forum',(req,res)=>
  {
      Post.findAll(
      {
          include:
          {
              model: User
          }
      })
      .then(data=>
      {
          const posts = data.map(post => post.get({ plain: true }) );
            //console.table(posts);
          const task = "comments";
          res.render('forum',{posts,loggedIn:req.session.loggedIn,task:task});
      })
      .catch(err => 
      {
          console.log(err);
          res.status(500).json(err);
      });
  });
  
  
  router.get('/posts/:id', (req, res) => {
      Post.findOne(
          {
              where:
              {
                  id:req.params.id
              },
              include:
              [
                  {
                      model:User
                  },
                  {
                      model:Comment,
                      include:
                      {
                          model:User
                      }
                  }
              ]
  
          })
          .then(data=>
          {
              const post = data.get({ plain: true });
              res.render('single-post',{post, username:req.session.username, loggedIn:req.session.loggedIn});
          })
          .catch(err => 
          {
              console.log(err);
              res.status(500).json(err);
          });
  });
  
  //, withAuth
  router.get('/posts/add-comment/:id', (req, res) => {   
    console.log("----Logged: " + req.session.loggedIn); 

    Post.findOne(
          {
              where:
              {
                  id:req.params.id
              },
              include:        
              {
                  model:User
              }
          })
          .then(data=>
          {
              const post = data.get({ plain: true });
              console.log(post);
              res.render('add-comment',{post, username:req.session.username, loggedIn:req.session.loggedIn});
          })
          .catch(err => 
          {
              console.log(err);
              res.status(500).json(err);
          });
  });
  
  router.get('/dashboard',withAuth, (req, res) => {
    Post.findAll(
        {
            where:
            {
                user_id:req.session.user_id
            },
            include:
            {
                model: User
            }
        })
        .then(data=>
        {
            const posts = data.map(post => post.get({ plain: true }) );
            const task = "create";
            res.render('dashboard',{posts,username:req.session.username,loggedIn:req.session.loggedIn,task:task});
        })
        .catch(err => 
        {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/dashboard/edit/:id',withAuth, (req, res) => {
    Post.findOne(
        {
            where:
            {
                user_id:req.session.user_id,
                id:req.params.id
            },
            include:
            {
                model: User
            }
        })
        .then(data=>
        {
            const post = data.get({ plain: true });
            const task = "edit";
            res.render('edit-post',{post,username:req.session.username,loggedIn:req.session.loggedIn,task:task,edit:true});
        })
        .catch(err => 
        {
            console.log(err);
            res.status(500).json(err);
        });
});



  module.exports = router;