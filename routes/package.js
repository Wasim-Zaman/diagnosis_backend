const express = require('express');
const { uploadSingle } = require('multermate');

const packageController = require('../controllers/package');
const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

const uploadConfig = {
  destination: 'uploads/packages',
  filename: 'image',
  fileTypes: ['images'],
  fileSizeLimit: 5 * 1024 * 1024, // 5MB limit
};

router.post('/v1/package', isAdmin, uploadSingle(uploadConfig), packageController.createPackage);
router.get('/v1/package', isAuth, packageController.getPackages);
router.get('/v1/package/:id', isAuth, packageController.getPackageById);
router.put('/v1/package/:id', isAdmin, uploadSingle(uploadConfig), packageController.updatePackageById);
router.delete('/v1/package/:id', isAdmin, packageController.deletePackageById);

module.exports = router;