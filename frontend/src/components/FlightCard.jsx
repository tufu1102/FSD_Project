import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Avatar,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  FlightTakeoff,
  FlightLand,
  AccessTime,
  Person,
  Close
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import BookingForm from './BookingForm';
import Notification from './Notification';

const FlightCard = ({ flight }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setShowBookingForm(true);
  };

  const handleBookingSuccess = (booking) => {
    setShowBookingForm(false);
    setNotification({
      message: `Booking confirmed! Booking ID: ${booking._id}`,
      type: 'success'
    });
  };

  const handleCloseBooking = () => {
    setShowBookingForm(false);
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  const formatTime = (time) => {
    return time;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
      <Card 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0px 12px 40px rgba(0, 0, 0, 0.15)'
          },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Top accent bar */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, #FF385C, #00A699)'
          }}
        />

        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                src={flight.logo}
                alt={flight.airline}
                sx={{ 
                  width: 48, 
                  height: 48,
                  bgcolor: 'grey.100'
                }}
              />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {flight.airline}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {flight.flightNumber}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                {formatPrice(flight.price)}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                per person
              </Typography>
            </Box>
          </Box>

          {/* Route */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ textAlign: 'center', flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  {flight.from}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                  <AccessTime sx={{ fontSize: 16 }} />
                  {formatTime(flight.departureTime)}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', flex: 2, mx: 2 }}>
                <Box sx={{ flex: 1, height: 2, bgcolor: 'grey.300' }} />
                <FlightTakeoff sx={{ mx: 1, color: 'primary.main', fontSize: 20 }} />
                <Box sx={{ flex: 1, height: 2, bgcolor: 'grey.300' }} />
              </Box>
              
              <Box sx={{ textAlign: 'center', flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  {flight.to}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                  <AccessTime sx={{ fontSize: 16 }} />
                  {formatTime(flight.arrivalTime)}
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Chip 
                label={formatDate(flight.date)} 
                size="small" 
                sx={{ 
                  bgcolor: 'grey.50',
                  color: 'text.secondary',
                  fontWeight: 500
                }} 
              />
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Footer */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Person sx={{ fontSize: 16, color: 'success.main' }} />
              <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 500 }}>
                {flight.availableSeats} seats available
              </Typography>
            </Box>
          </Box>
        </CardContent>

        <CardActions sx={{ p: 3, pt: 0 }}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={handleBookNow}
            disabled={flight.availableSeats === 0}
            sx={{
              py: 1.5,
              fontWeight: 600,
              backgroundColor: 'primary.main',
              '&:hover': {
                backgroundColor: 'primary.dark',
                transform: 'translateY(-2px)',
                boxShadow: '0px 6px 20px rgba(255, 56, 92, 0.3)'
              },
              '&:disabled': {
                backgroundColor: 'grey.300',
                color: 'grey.500'
              }
            }}
          >
            {flight.availableSeats === 0 ? 'Sold Out' : 'Book Now'}
          </Button>
        </CardActions>
      </Card>

      {/* Booking Dialog */}
      <Dialog
        open={showBookingForm}
        onClose={handleCloseBooking}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0px 20px 60px rgba(0, 0, 0, 0.15)'
          }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Book Flight
            </Typography>
            <IconButton onClick={handleCloseBooking} size="small">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <BookingForm 
            flight={flight}
            onClose={handleCloseBooking}
            onSuccess={handleBookingSuccess}
          />
        </DialogContent>
      </Dialog>

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}
    </>
  );
};

export default FlightCard;