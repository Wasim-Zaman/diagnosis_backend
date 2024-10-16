const express = require('express');
const router = express.Router();
const { uploadSingle } = require('multermate');
const bannerController = require('../controllers/banner');
const isAuth = require('../middleware/isAuth');

const config = {
  destination: 'uploads',
  fileTypes: ['images'],
  filename: 'image',
};

// Banner routes
router.post('/v1/banner', isAuth, uploadSingle(config), bannerController.createBanner);
router.get('/v1/banners', bannerController.getBanners);
router.get('/v1/banner/:id', bannerController.getBannerById);
router.put('/v1/banner/:id', isAuth, uploadSingle(config), bannerController.updateBannerById);
router.delete('/v1/banner/:id', isAuth, bannerController.deleteBannerById);
router.get('/v1/banners/paginated', bannerController.getPaginatedBanners);
router.get('/v1/banners/active', bannerController.getActiveBanners);

module.exports = router;
