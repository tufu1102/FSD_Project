const express = require('express');
const router = express.Router();
const {
  createBooking,
  getUserBookings,
  getAllBookings,
  cancelBooking
} = require('../controllers/bookingController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// Protected routes
router.post('/', authMiddleware, createBooking);
router.get('/my-bookings', authMiddleware, getUserBookings);
router.delete('/:id', authMiddleware, cancelBooking);

// Admin only route
router.get('/all', authMiddleware, adminMiddleware, getAllBookings);

module.exports = router;
