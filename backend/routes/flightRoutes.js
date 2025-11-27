const express = require('express');
const router = express.Router();
const {
  getAllFlights,
  getFlightById,
  createFlight,
  updateFlight,
  deleteFlight
} = require('../controllers/flightController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllFlights);
router.get('/:id', getFlightById);

// Admin only routes
router.post('/', authMiddleware, adminMiddleware, createFlight);
router.put('/:id', authMiddleware, adminMiddleware, updateFlight);
router.delete('/:id', authMiddleware, adminMiddleware, deleteFlight);

module.exports = router;
