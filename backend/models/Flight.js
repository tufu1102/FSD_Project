const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: [true, 'Flight number is required'],
    unique: true,
    trim: true
  },
  airline: {
    type: String,
    required: [true, 'Airline is required'],
    trim: true
  },
  from: {
    type: String,
    required: [true, 'Source city is required'],
    trim: true
  },
  to: {
    type: String,
    required: [true, 'Destination city is required'],
    trim: true
  },
  date: {
    type: String,
    required: [true, 'Date is required']
  },
  departureTime: {
    type: String,
    required: [true, 'Departure time is required']
  },
  arrivalTime: {
    type: String,
    required: [true, 'Arrival time is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  logo: {
    type: String,
    required: [true, 'Logo URL is required']
  },
  availableSeats: {
    type: Number,
    default: 180,
    min: [0, 'Available seats cannot be negative']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Flight', flightSchema);
