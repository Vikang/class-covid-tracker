const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();


router.post('/register', authController.register);

router.post('/login', authController.login );

router.post('/edit', authController.edit);

router.post('/report', authController.report);

router.post('/requestappt', authController.requestappt );

router.post('/edit-appt', authController.requestappt );

router.get('/logout', authController.logout );

//router.get('/appointment', authController.appointment );

//router.get('/edit', authController.edit );

module.exports = router;