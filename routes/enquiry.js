const express = require('express');
const { uploadMultiple, uploadSingle } = require('multermate');
const enquiryController = require('../controllers/enquiry');

const router = express.Router();

const uploadMultiple = {
  destination: 'uploads/enquiries',
  fields: [
    { name: 'image', maxCount: 1, fileTypes: ['images'] },
    { name: 'images', maxCount: 5, fileTypes: ['images'] },
  ],
  fileSizeLimit: 5 * 1024 * 1024, // 5MB limit
};

const uploadSingle = {
  destination: 'uploads/enquiries',
  filename: 'image',
};

router.post(
  '/v1/enquiries',
  uploadMultiple(uploadMultiple),
  uploadSingle(uploadSingle),
  enquiryController.createEnquiry
);

router.put(
  '/v1/enquiries/:id',
  uploadMultiple(uploadMultiple),
  uploadSingle(uploadSingle),
  enquiryController.updateEnquiryById
);

// Other routes...

router.get('/v1/enquiries', enquiryController.getEnquiries);

router.get('/v1/enquiries/:id', enquiryController.getEnquiryById);

router.delete('/v1/enquiries/:id', enquiryController.deleteEnquiryById);

module.exports = router;
