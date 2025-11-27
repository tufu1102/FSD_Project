import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Divider,
  Paper,
  Grid,
  Chip,
  Avatar,
  CircularProgress,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  FlightTakeoff,
  FlightLand,
  AccessTime,
  Person,
  Email,
  ConfirmationNumber,
  Add,
  Delete,
  ExpandMore
} from '@mui/icons-material';
import axios from 'axios';
import { API_BASE_URL } from '../api';

const BookingForm = ({ flight, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    seats: 1,
    passengers: [
      { name: '', email: '' }
    ]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSeatsChange = (e) => {
    const seats = parseInt(e.target.value);
    setFormData(prev => ({
      ...prev,
      seats,
      passengers: Array(seats).fill().map((_, index) => 
        prev.passengers[index] || { name: '', email: '' }
      )
    }));
  };

  const handlePassengerChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      passengers: prev.passengers.map((passenger, i) => 
        i === index ? { ...passenger, [field]: value } : passenger
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    const emptyFields = formData.passengers.some(p => !p.name || !p.email);
    if (emptyFields) {
      setError('Please fill in all passenger details');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/bookings`, {
        flightId: flight._id,
        seats: formData.seats,
        passengerName: formData.passengers[0].name, // Primary passenger
        passengerEmail: formData.passengers[0].email,
        passengers: formData.passengers // All passengers
      });

      if (response.data.success) {
        onSuccess(response.data.booking);
        onClose();
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = flight.price * formData.seats;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Box>
      {/* Flight Summary */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 3, 
          bgcolor: 'grey.50',
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'grey.200'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar
            src={flight.logo}
            alt={flight.airline}
            sx={{ width: 40, height: 40 }}
          />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {flight.airline} - {flight.flightNumber}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {flight.from} → {flight.to}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Departure: {flight.departureTime}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FlightTakeoff sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                From: {flight.from}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Arrival: {flight.arrivalTime}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FlightLand sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                To: {flight.to}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Date: {formatDate(flight.date)}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
            {formatPrice(flight.price)} per person
          </Typography>
        </Box>
      </Paper>

      {/* Booking Form */}
      <Box component="form" onSubmit={handleSubmit}>
        {/* Number of Seats */}
        <TextField
          fullWidth
          select
          label="Number of Seats"
          name="seats"
          value={formData.seats}
          onChange={handleSeatsChange}
          required
          sx={{ mb: 3 }}
          SelectProps={{
            native: true,
          }}
        >
          {[...Array(Math.min(9, flight.availableSeats))].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} seat{i + 1 > 1 ? 's' : ''}
            </option>
          ))}
        </TextField>

        {/* Passenger Details */}
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
          Passenger Details
        </Typography>

        {formData.passengers.map((passenger, index) => (
          <Accordion 
            key={index} 
            defaultExpanded={index === 0}
            sx={{ 
              mb: 2, 
              '&:before': { display: 'none' },
              boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: 2
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              sx={{ 
                bgcolor: 'primary.50',
                borderRadius: '8px 8px 0 0',
                '&.Mui-expanded': {
                  borderRadius: '8px 8px 0 0'
                }
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'primary.main' }}>
                Passenger {index + 1}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={`Passenger ${index + 1} Name`}
                    value={passenger.name}
                    onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                    required
                    InputProps={{
                      startAdornment: <Person sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={`Passenger ${index + 1} Email`}
                    type="email"
                    value={passenger.email}
                    onChange={(e) => handlePassengerChange(index, 'email', e.target.value)}
                    required
                    InputProps={{
                      startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
                    }}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}

        {/* Price Summary */}
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mt: 3, 
            bgcolor: 'primary.50',
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'primary.200'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
            Price Summary
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Price per seat:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {formatPrice(flight.price)}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Number of seats:
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {formData.seats}
            </Typography>
          </Box>
          
          <Divider sx={{ my: 1 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
              Total:
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
              {formatPrice(totalPrice)}
            </Typography>
          </Box>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button
            variant="outlined"
            onClick={onClose}
            fullWidth
            sx={{ py: 1.5 }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            fullWidth
            sx={{ 
              py: 1.5,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0px 6px 20px rgba(255, 56, 92, 0.3)'
              }
            }}
          >
            {loading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} color="inherit" />
                Booking...
              </Box>
            ) : (
              'Confirm Booking'
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BookingForm;