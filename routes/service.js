const express = require('express');
const { uploadSingle } = require('multermate');

const serviceController = require('../controllers/service');
const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();
const uploadConfig = {
  destination: 'uploads',
  fileTypes: ['images'],
  fileSizeLimit: 5 * 1024 * 1024, // 5MB
  filename: 'image',
};

// Service routes
router.post('/v1/service', isAdmin, uploadSingle(uploadConfig), serviceController.createService);
router.get('/v1/services', serviceController.getServices);
router.get('/v1/services/all', serviceController.getAllServices);
router.get('/v1/service/:id', serviceController.getServiceById);
router.put('/v1/service/:id', isAdmin, uploadSingle(uploadConfig), serviceController.updateServiceById);
router.delete('/v1/service/:id', isAdmin, serviceController.deleteServiceById);

module.exports = router;
