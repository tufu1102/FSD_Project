import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Avatar,
  Chip,
  Divider,
  Alert,
  CircularProgress,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import {
  FlightTakeoff,
  FlightLand,
  AccessTime,
  Person,
  Email,
  ConfirmationNumber,
  Cancel,
  Delete,
  Edit
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { API_BASE_URL } from '../api';

const MyBookings = () => {
  const { isAuthenticated } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelDialog, setCancelDialog] = useState({ open: false, bookingId: null });

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    }
  }, [isAuthenticated]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/bookings/my-bookings`);
      setBookings(response.data.bookings);
    } catch (error) {
      setError('Failed to fetch bookings');
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    if (!cancelDialog.bookingId) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/bookings/${cancelDialog.bookingId}`);
      setBookings(bookings.filter(booking => booking._id !== cancelDialog.bookingId));
      setCancelDialog({ open: false, bookingId: null });
    } catch (error) {
      setError('Failed to cancel booking');
      console.error('Error cancelling booking:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  if (!isAuthenticated) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="md">
          <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
            <Typography variant="h4" sx={{ mb: 2, color: 'text.primary' }}>
              Authentication Required
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Please log in to view your bookings.
            </Typography>
          </Paper>
        </Container>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} sx={{ mb: 2 }} />
          <Typography variant="h6" sx={{ color: 'text.secondary' }}>
            Loading your bookings...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Header */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            My Bookings
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Manage your flight reservations
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {bookings.length === 0 ? (
          <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3 }}>
            <FlightTakeoff sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
            <Typography variant="h5" sx={{ mb: 2, color: 'text.primary' }}>
              No Bookings Found
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
              You haven't made any bookings yet.
            </Typography>
            <Button
              variant="contained"
              href="/"
              sx={{
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0px 6px 20px rgba(255, 56, 92, 0.3)'
                }
              }}
            >
              Book a Flight
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {bookings.map(booking => (
              <Grid item xs={12} key={booking._id}>
                <Card sx={{ borderRadius: 3, overflow: 'hidden' }}>
                  <CardContent sx={{ p: 3 }}>
                    {/* Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          src={booking.flight.logo}
                          alt={booking.flight.airline}
                          sx={{ width: 48, height: 48 }}
                        />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {booking.flight.airline} - {booking.flight.flightNumber}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {booking.flight.from} → {booking.flight.to}
                          </Typography>
                        </Box>
                      </Box>
                      <Chip
                        label={booking.status}
                        color={booking.status === 'confirmed' ? 'success' : 'error'}
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Flight Details */}
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Date
                          </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {formatDate(booking.flight.date)}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Time
                          </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {formatTime(booking.flight.departureTime)} - {formatTime(booking.flight.arrivalTime)}
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <Person sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Passengers ({booking.seats})
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          {booking.passengers && booking.passengers.length > 0 ? (
                            booking.passengers.map((passenger, index) => (
                              <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {passenger.name}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                  {passenger.email}
                                </Typography>
                              </Box>
                            ))
                          ) : (
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {booking.passengerName}
                              </Typography>
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {booking.passengerEmail}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <ConfirmationNumber sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Seats
                          </Typography>
                        </Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {booking.seats}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Total Price
                          </Typography>
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                          {formatPrice(booking.totalPrice)}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Divider sx={{ my: 2 }} />

                    {/* Footer */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Booked on: {formatDate(booking.bookingDate)}
                      </Typography>
                      {booking.status === 'confirmed' && (
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<Cancel />}
                          onClick={() => setCancelDialog({ open: true, bookingId: booking._id })}
                          sx={{ fontWeight: 600 }}
                        >
                          Cancel Booking
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Cancel Confirmation Dialog */}
      <Dialog
        open={cancelDialog.open}
        onClose={() => setCancelDialog({ open: false, bookingId: null })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Cancel Booking
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Are you sure you want to cancel this booking? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setCancelDialog({ open: false, bookingId: null })}
            sx={{ fontWeight: 600 }}
          >
            Keep Booking
          </Button>
          <Button
            onClick={handleCancelBooking}
            color="error"
            variant="contained"
            sx={{ fontWeight: 600 }}
          >
            Cancel Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyBookings;