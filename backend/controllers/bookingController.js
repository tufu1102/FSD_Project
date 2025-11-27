const Booking = require('../models/Booking');
const Flight = require('../models/Flight');

// Create Booking
const createBooking = async (req, res) => {
  try {
    const { flightId, passengerName, passengerEmail, seats, passengers } = req.body;
    const userId = req.user._id;

    // Validation
    if (!flightId || !passengerName || !passengerEmail || !seats) {
      return res.status(400).json({ 
        message: 'All fields are required' 
      });
    }

    // If multiple passengers provided, validate them
    if (passengers && passengers.length > 0) {
      if (passengers.length !== seats) {
        return res.status(400).json({ 
          message: 'Number of passenger details must match number of seats' 
        });
      }
      
      for (let i = 0; i < passengers.length; i++) {
        if (!passengers[i].name || !passengers[i].email) {
          return res.status(400).json({ 
            message: `Passenger ${i + 1} name and email are required` 
          });
        }
      }
    }

    if (seats < 1 || seats > 9) {
      return res.status(400).json({ 
        message: 'Number of seats must be between 1 and 9' 
      });
    }

    // Check if flight exists
    const flight = await Flight.findById(flightId);
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    // Check if enough seats are available
    if (flight.availableSeats < seats) {
      return res.status(400).json({ 
        message: `Only ${flight.availableSeats} seats available. You requested ${seats} seats.` 
      });
    }

    // Calculate total price
    const totalPrice = flight.price * seats;

    // Create booking
    const booking = new Booking({
      user: userId,
      flight: flightId,
      passengerName,
      passengerEmail,
      seats,
      totalPrice,
      passengers: passengers || [{ name: passengerName, email: passengerEmail }]
    });

    await booking.save();

    // Update available seats atomically
    const updatedFlight = await Flight.findByIdAndUpdate(
      flightId,
      { $inc: { availableSeats: -seats } },
      { new: true }
    );

    if (!updatedFlight) {
      // Rollback booking if flight update failed
      await Booking.findByIdAndDelete(booking._id);
      return res.status(500).json({ message: 'Failed to update flight seats' });
    }

    // Populate flight details for response
    await booking.populate('flight', 'flightNumber airline from to date departureTime arrivalTime price logo availableSeats');

    res.status(201).json({
      success: true,
      message: 'Booking confirmed successfully',
      booking,
      remainingSeats: updatedFlight.availableSeats
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Server error while creating booking' });
  }
};

// Get User Bookings
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('flight', 'flightNumber airline from to date departureTime arrivalTime price logo')
      .sort({ bookingDate: -1 });

    res.json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
};

// Get All Bookings (Admin only)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('flight', 'flightNumber airline from to date departureTime arrivalTime price logo')
      .sort({ bookingDate: -1 });

    res.json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({ message: 'Server error while fetching bookings' });
  }
};

// Cancel Booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if user owns this booking or is admin
    if (booking.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Check if booking is already cancelled
    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking is already cancelled' });
    }

    // Update booking status and return seats atomically
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );

    // Return seats to flight
    const updatedFlight = await Flight.findByIdAndUpdate(
      booking.flight,
      { $inc: { availableSeats: booking.seats } },
      { new: true }
    );

    if (!updatedFlight) {
      console.error('Failed to update flight seats after cancellation');
    }

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      booking: updatedBooking,
      remainingSeats: updatedFlight?.availableSeats
    });
  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({ message: 'Server error while cancelling booking' });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getAllBookings,
  cancelBooking
};
