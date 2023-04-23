const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

const passport = require('passport');
const authentication = passport.authenticate("่jwt", {session : false});



router.get('/getuser', userController.getUser);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.put('/logout', authentication, userController.logoutUser);


module.exports = router;