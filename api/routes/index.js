var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  algorithms: ['HS256'],
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

// profile
router.route('/profile').get(auth, ctrlProfile.profileRead);
router.route('/:id/addtopic').post(auth, ctrlProfile.addTopic);

// authentication
router.route('/register').post(ctrlAuth.register);
router.route('/login').post(ctrlAuth.login);

router.route('/test').get((req, res) => {
    res.send('Test Worked');
})

module.exports = router;