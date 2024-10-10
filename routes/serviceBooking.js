const express = require('express');

const serviceBookingController = require('../controllers/serviceBooking');
const isAdmin = require('../middleware/isAdmin');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

// Create a new service booking
router.post('/create-service-booking', isAuth, serviceBookingController.createServiceBooking);

// Get user service bookings
router.get('/get-user-service-bookings', isAuth, serviceBookingController.getUserServiceBookings);

// Get all service bookings with pagination
router.get('/get-service-bookings', serviceBookingController.getServiceBookings);

// Get service booking by ID
router.get('/get-service-booking/:id', serviceBookingController.getServiceBookingById);

// Update service booking by ID
router.put('/update-service-booking/:id', isAdmin, serviceBookingController.updateServiceBookingById);

// Update service booking status
router.put('/update-service-booking-status/:id', isAdmin, serviceBookingController.updateServiceBookingStatus);

// Delete service booking by ID
router.delete('/delete-service-booking/:id', isAdmin, serviceBookingController.deleteServiceBookingById);

module.exports = router;
