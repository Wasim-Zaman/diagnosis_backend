const express = require('express');
const { uploadMultiple, uploadSingle } = require('multermate');

const router = express.Router();
const userController = require('../controllers/user');
const isAuth = require('../middleware/isAuth');

// User routes
router.post('/v1/register', userController.register);
router.post('/v1/login', userController.login);
router.get('/v1/user/:id', isAuth, userController.getUserById);
router.get('/v1/user', isAuth, userController.getUser);
router.put(
  '/v1/user/:id',
  isAuth,
  uploadSingle({
    destination: 'uploads/users', // Specify the destination folder for user images
    fileTypes: ['images'], // Allow only image uploads
    fileSizeLimit: 5 * 1024 * 1024, // 5MB limit
    filename: 'image', // The field name in the form data
  }),
  userController.updateUserById
);
router.delete('/v1/user/:id', isAuth, userController.deleteUserById);
router.get('/v1/users', isAuth, userController.getUsers);
router.post('/v1/reset-password', userController.resetPassword);

module.exports = router;
