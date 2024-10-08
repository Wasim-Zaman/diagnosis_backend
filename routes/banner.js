const express = require('express');
const router = express.Router();
const { uploadSingle } = require('multermate');
const bannerController = require('../controllers/banner');
const isAuth = require('../middleware/isAuth');

// Banner routes
router.post(
  '/v1/banner',
  isAuth,
  uploadSingle({
    destination: 'uploads/banners', // Specify the destination folder for banner images
    fileTypes: ['images'], // Allow only image uploads
    fileSizeLimit: 10 * 1024 * 1024, // 10MB limit
    filename: 'image', // The field name in the form data
  }),
  bannerController.createBanner
);
router.get('/v1/banners', isAuth, bannerController.getBanners);
router.get('/v1/banner/:id', isAuth, bannerController.getBannerById);
router.put(
  '/v1/banner/:id',
  isAuth,
  uploadSingle({
    destination: 'uploads/banners',
    fileTypes: ['images'],
    fileSizeLimit: 10 * 1024 * 1024,
    filename: 'image',
  }),
  bannerController.updateBannerById
);
router.delete('/v1/banner/:id', isAuth, bannerController.deleteBannerById);

module.exports = router;
