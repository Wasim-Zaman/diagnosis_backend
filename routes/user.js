const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const isAuth = require('../middleware/isAuth');

// User routes
router.post('/v1/register', userController.register);
router.post('/v1/login', userController.login);
router.get('/v1/user/:id', isAuth, userController.getUserById);
router.get('/v1/user', isAuth, userController.getUser);
router.put('/v1/user/:id', isAuth, userController.updateUserById);
router.delete('/v1/user/:id', isAuth, userController.deleteUserById);
router.get('/v1/users', isAuth, userController.getUsers);
router.post('/v1/reset-password', userController.resetPassword);

module.exports = router;
