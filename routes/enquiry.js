const express = require('express');
const { uploadMultiple, uploadSingle } = require('multermate');
const enquiryController = require('../controllers/enquiry');

const router = express.Router();

const multiple = {
  destination: 'uploads/enquiries',
  fields: [
    { name: 'image', maxCount: 1, fileTypes: ['images'] },
    { name: 'images', maxCount: 5, fileTypes: ['images'] },
  ],
  fileSizeLimit: 5 * 1024 * 1024, // 5MB limit
};

const single = {
  destination: 'uploads',
  filename: 'image',
};

router.post('/v1/enquiries', uploadMultiple(multiple), uploadSingle(single), enquiryController.createEnquiry);

router.get('/v1/enquiries', enquiryController.getEnquiries);

router.get('/v1/enquiries/all', enquiryController.getAllEnquiries);

router.get('/v1/enquiries/:id', enquiryController.getEnquiryById);

router.put('/v1/enquiries/:id', uploadMultiple(multiple), uploadSingle(single), enquiryController.updateEnquiryById);

router.delete('/v1/enquiries/:id', enquiryController.deleteEnquiryById);

module.exports = router;
