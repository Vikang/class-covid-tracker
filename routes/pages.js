const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.get('/', authController.isLoggedIn, (req, res) => {
  res.render('index', {
    student: req.student
  });
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/profile', authController.isLoggedIn, (req, res) => {
  //console.log(req.student);
  if( req.student ) {
    res.render('profile', {
      student: req.student
    });
  } else {
    res.redirect('/login');
  }
  
})

router.get('/edit', authController.isLoggedIn, (req, res) => {
    res.render('edit', {
      student: req.student
    });
  });

router.get('/report', authController.isLoggedIn, (req, res) => {
    res.render('report', {
      student: req.student
    });
  });

  router.get('/appointment', authController.isLoggedIn, (req, res) => {
    res.render('appointment', {
      student: req.student
    });
  });

  router.get('/requestappt', authController.isLoggedIn, (req, res) => {
    res.render('requestappt', {
      student: req.student
    });
  });

  router.get('/edit-appt', authController.isLoggedIn, (req, res) => {
    res.render('editapptform', {
      student: req.student
    });
  });

module.exports = router;