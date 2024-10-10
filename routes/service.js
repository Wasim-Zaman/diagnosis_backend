const express = require('express');
const { uploadSingle } = require('multermate');
const router = express.Router();
const serviceController = require('../controllers/service');
const isAuth = require('../middleware/isAuth');

const uploadConfig = {
  destination: 'uploads/services',
  fileTypes: ['images'],
  fileSizeLimit: 5 * 1024 * 1024, // 5MB
  filename: 'image',
};

// Service routes
router.post('/v1/service', isAuth, uploadSingle(uploadConfig), serviceController.createService);
router.get('/v1/services', serviceController.getServices);
router.get('/v1/service/:id', serviceController.getServiceById);
router.put('/v1/service/:id', isAuth, uploadSingle(uploadConfig), serviceController.updateServiceById);
router.delete('/v1/service/:id', isAuth, serviceController.deleteServiceById);

module.exports = router;
