const Flight = require('../models/Flight');

// Get All Flights
const getAllFlights = async (req, res) => {
  try {
    const { from, to, date, airline } = req.query;
    
    let filter = {};
    
    if (from) filter.from = { $regex: from, $options: 'i' };
    if (to) filter.to = { $regex: to, $options: 'i' };
    if (date) filter.date = date;
    if (airline) filter.airline = { $regex: airline, $options: 'i' };

    const flights = await Flight.find(filter).sort({ date: 1, departureTime: 1 });
    
    res.json({
      success: true,
      count: flights.length,
      flights
    });
  } catch (error) {
    console.error('Get flights error:', error);
    res.status(500).json({ message: 'Server error while fetching flights' });
  }
};

// Get Single Flight
const getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    
    res.json({
      success: true,
      flight
    });
  } catch (error) {
    console.error('Get flight error:', error);
    res.status(500).json({ message: 'Server error while fetching flight' });
  }
};

// Create Flight (Admin only)
const createFlight = async (req, res) => {
  try {
    const flight = new Flight(req.body);
    await flight.save();
    
    res.status(201).json({
      success: true,
      message: 'Flight created successfully',
      flight
    });
  } catch (error) {
    console.error('Create flight error:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Flight number already exists' });
    }
    res.status(500).json({ message: 'Server error while creating flight' });
  }
};

// Update Flight (Admin only)
const updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    
    res.json({
      success: true,
      message: 'Flight updated successfully',
      flight
    });
  } catch (error) {
    console.error('Update flight error:', error);
    res.status(500).json({ message: 'Server error while updating flight' });
  }
};

// Delete Flight (Admin only)
const deleteFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.id);
    
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    
    res.json({
      success: true,
      message: 'Flight deleted successfully'
    });
  } catch (error) {
    console.error('Delete flight error:', error);
    res.status(500).json({ message: 'Server error while deleting flight' });
  }
};

module.exports = {
  getAllFlights,
  getFlightById,
  createFlight,
  updateFlight,
  deleteFlight
};
