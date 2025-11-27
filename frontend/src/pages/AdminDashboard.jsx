import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Avatar,
  Alert,
  CircularProgress,
  IconButton,
  Pagination,
  Snackbar
} from '@mui/material';
import {
  FlightTakeoff,
  Add,
  Edit,
  Delete,
  People,
  Assignment
} from '@mui/icons-material';

const AdminDashboard = () => {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('flights');
  const [flights, setFlights] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showFlightForm, setShowFlightForm] = useState(false);
  const [editingFlight, setEditingFlight] = useState(null);
  const [flightForm, setFlightForm] = useState({
    flightNumber: '',
    airline: '',
    from: '',
    to: '',
    date: '',
    departureTime: '',
    arrivalTime: '',
    price: '',
    logo: '',
    availableSeats: 180
  });
  const [flightSearchTerm, setFlightSearchTerm] = useState('');
  const [bookingsSearchTerm, setBookingsSearchTerm] = useState('');
  const [flightsPage, setFlightsPage] = useState(1);
  const [bookingsPage, setBookingsPage] = useState(1);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    if (isAdmin) {
      fetchFlights();
      fetchBookings();
    }
  }, [isAdmin]);

  useEffect(() => {
    setFlightsPage(1);
  }, [flightSearchTerm, flights.length]);

  useEffect(() => {
    setBookingsPage(1);
  }, [bookingsSearchTerm, bookings.length]);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/flights');
      setFlights(response.data.flights || []);
    } catch (error) {
      setError('Failed to fetch flights');
      console.error('Error fetching flights:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/api/bookings/all');
      setBookings(response.data.bookings || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleFlightFormChange = (field, value) => {
    setFlightForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const resetFlightForm = () => {
    setEditingFlight(null);
    setFlightForm({
      flightNumber: '',
      airline: '',
      from: '',
      to: '',
      date: '',
      departureTime: '',
      arrivalTime: '',
      price: '',
      logo: '',
      availableSeats: 180
    });
  };

  const showNotification = (message, severity = 'success') => {
    setNotification({
      open: true,
      message,
      severity
    });
  };

  const handleNotificationClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setNotification(prev => ({ ...prev, open: false }));
  };

  const handleFlightSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const flightData = {
        ...flightForm,
        price: parseFloat(flightForm.price),
        availableSeats: parseInt(flightForm.availableSeats, 10)
      };

      if (editingFlight) {
        await axios.put(`/api/flights/${editingFlight._id}`, flightData);
        showNotification('Flight updated successfully', 'success');
      } else {
        await axios.post('/api/flights', flightData);
        showNotification('Flight created successfully', 'success');
      }

      setShowFlightForm(false);
      resetFlightForm();
      fetchFlights();
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to save flight';
      setError(message);
      showNotification(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEditFlight = (flight) => {
    setEditingFlight(flight);
    setFlightForm({
      flightNumber: flight.flightNumber,
      airline: flight.airline,
      from: flight.from,
      to: flight.to,
      date: flight.date,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
      price: flight.price.toString(),
      logo: flight.logo,
      availableSeats: flight.availableSeats
    });
    setShowFlightForm(true);
  };

  const handleDeleteFlight = async (flightId) => {
    if (!window.confirm('Are you sure you want to delete this flight?')) {
      return;
    }

    try {
      await axios.delete(`/api/flights/${flightId}`);
      fetchFlights();
      showNotification('Flight deleted successfully', 'success');
    } catch (error) {
      const message = 'Failed to delete flight';
      setError(message);
      showNotification(message, 'error');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const normalize = (value) => (value || '').toString().toLowerCase();

  const filteredFlights = flights.filter((flight) => {
    const term = normalize(flightSearchTerm);
    if (!term) return true;
    return [
      flight.flightNumber,
      flight.airline,
      flight.from,
      flight.to
    ].some((field) => normalize(field).includes(term));
  });

  const filteredBookings = bookings.filter((booking) => {
    const term = normalize(bookingsSearchTerm);
    if (!term) return true;

    const { flight, passengerName, passengerEmail, status } = booking;

    return [
      passengerName,
      passengerEmail,
      status,
      flight?.airline,
      flight?.flightNumber,
      flight?.from,
      flight?.to
    ].some((field) => normalize(field).includes(term));
  });

  const flightsPerPage = 6;
  const bookingsPerPage = 6;

  const flightsPageCount = Math.max(1, Math.ceil(filteredFlights.length / flightsPerPage) || 1);
  const bookingsPageCount = Math.max(1, Math.ceil(filteredBookings.length / bookingsPerPage) || 1);

  const flightsStartIndex = (flightsPage - 1) * flightsPerPage;
  const bookingsStartIndex = (bookingsPage - 1) * bookingsPerPage;

  const paginatedFlights = filteredFlights.slice(
    flightsStartIndex,
    flightsStartIndex + flightsPerPage
  );

  const paginatedBookings = filteredBookings.slice(
    bookingsStartIndex,
    bookingsStartIndex + bookingsPerPage
  );

  if (!isAdmin) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'grey.50',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 8
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 6,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'grey.200',
            textAlign: 'center',
            maxWidth: 480
          }}
        >
          <FlightTakeoff sx={{ fontSize: 56, color: 'grey.300', mb: 2 }} />
          <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
            Access Denied
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            You need admin privileges to access this page.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Header */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6, mb: 4 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <FlightTakeoff sx={{ fontSize: 40 }} />
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Admin Dashboard
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Manage flights and monitor all bookings
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 6 }}>
        {/* Tabs + summary */}
        <Paper
          elevation={0}
          sx={{
            mb: 4,
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'grey.200',
            overflow: 'hidden',
            bgcolor: 'background.paper'
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(_, value) => setActiveTab(value)}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab
              value="flights"
              label="Flights"
              icon={<FlightTakeoff />}
              iconPosition="start"
              sx={{ fontWeight: 600 }}
            />
            <Tab
              value="bookings"
              label="Bookings"
              icon={<Assignment />}
              iconPosition="start"
              sx={{ fontWeight: 600 }}
            />
          </Tabs>

          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    bgcolor: 'primary.50',
                    border: '1px solid',
                    borderColor: 'primary.100'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 600 }}>
                        Total Flights
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {flights.length}
                      </Typography>
                    </Box>
                    <FlightTakeoff sx={{ fontSize: 40, color: 'primary.main' }} />
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    bgcolor: 'secondary.50',
                    border: '1px solid',
                    borderColor: 'secondary.100'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ color: 'secondary.main', fontWeight: 600 }}>
                        Total Bookings
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        {bookings.length}
                      </Typography>
                    </Box>
                    <People sx={{ fontSize: 40, color: 'secondary.main' }} />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Flights tab */}
        {activeTab === 'flights' && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, gap: 2, flexWrap: 'wrap' }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Flights
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                <TextField
                  size="small"
                  label="Search flights"
                  placeholder="By airline, number, route"
                  value={flightSearchTerm}
                  onChange={(e) => setFlightSearchTerm(e.target.value)}
                />
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => {
                    resetFlightForm();
                    setShowFlightForm(true);
                  }}
                  sx={{
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)'
                    }
                  }}
                >
                  Add New Flight
                </Button>
              </Box>
            </Box>

            {loading && flights.length === 0 ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                <CircularProgress />
              </Box>
            ) : filteredFlights.length === 0 ? (
              <Paper
                elevation={0}
                sx={{
                  p: 6,
                  textAlign: 'center',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'grey.200',
                  bgcolor: 'background.paper'
                }}
              >
                <FlightTakeoff sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
                <Typography variant="h6" sx={{ mb: 1 }}>
                  No flights found
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                  Start by adding your first flight to the system.
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={() => {
                    resetFlightForm();
                    setShowFlightForm(true);
                  }}
                >
                  Add Flight
                </Button>
              </Paper>
            ) : (
              <>
                <Grid container spacing={3}>
                  {paginatedFlights.map((flight) => (
                    <Grid item xs={12} md={6} key={flight._id}>
                      <Card sx={{ borderRadius: 3 }}>
                        <CardContent sx={{ pb: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar src={flight.logo} alt={flight.airline} />
                              <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                  {flight.airline} - {flight.flightNumber}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                  {flight.from} → {flight.to}
                                </Typography>
                              </Box>
                            </Box>
                            <Chip
                              label={`${flight.availableSeats} seats`}
                              color="success"
                              variant="outlined"
                              size="small"
                            />
                          </Box>

                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                Date
                              </Typography>
                              <Typography variant="body2">{formatDate(flight.date)}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                Time
                              </Typography>
                              <Typography variant="body2">
                                {flight.departureTime} - {flight.arrivalTime}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                Price
                              </Typography>
                              <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                {formatPrice(flight.price)}
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                        <CardActions sx={{ justifyContent: 'flex-end', pt: 0, pb: 2, px: 2 }}>
                          <Button
                            size="small"
                            startIcon={<Edit />}
                            onClick={() => handleEditFlight(flight)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            color="error"
                            startIcon={<Delete />}
                            onClick={() => handleDeleteFlight(flight._id)}
                          >
                            Delete
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {flightsPageCount > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                      count={flightsPageCount}
                      page={flightsPage}
                      onChange={(_, page) => setFlightsPage(page)}
                      color="primary"
                      shape="rounded"
                    />
                  </Box>
                )}
              </>
            )}
          </Box>
        )}

        {/* Bookings tab */}
        {activeTab === 'bookings' && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, gap: 2, flexWrap: 'wrap' }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                All Bookings
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                <TextField
                  size="small"
                  label="Search bookings"
                  placeholder="By passenger, airline, route, status"
                  value={bookingsSearchTerm}
                  onChange={(e) => setBookingsSearchTerm(e.target.value)}
                />
                <Chip label={`${filteredBookings.length} bookings`} color="primary" variant="outlined" />
              </Box>
            </Box>

            {filteredBookings.length === 0 ? (
              <Paper
                elevation={0}
                sx={{
                  p: 6,
                  textAlign: 'center',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'grey.200',
                  bgcolor: 'background.paper'
                }}
              >
                <People sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
                <Typography variant="h6" sx={{ mb: 1 }}>
                  No bookings found
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Bookings will appear here once users start booking flights.
                </Typography>
              </Paper>
            ) : (
              <>
                <Grid container spacing={3}>
                  {paginatedBookings.map((booking) => (
                    <Grid item xs={12} key={booking._id}>
                      <Card sx={{ borderRadius: 3 }}>
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar src={booking.flight.logo} alt={booking.flight.airline} />
                              <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
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
                              variant="outlined"
                            />
                          </Box>

                          <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                Passenger
                              </Typography>
                              <Typography variant="body2">
                                {booking.passengerName} ({booking.passengerEmail})
                              </Typography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                Date
                              </Typography>
                              <Typography variant="body2">{formatDate(booking.flight.date)}</Typography>
                            </Grid>
                            <Grid item xs={12} md={2}>
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                Seats
                              </Typography>
                              <Typography variant="body2">{booking.seats}</Typography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                Total
                              </Typography>
                              <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main' }}>
                                {formatPrice(booking.totalPrice)}
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>

                {bookingsPageCount > 1 && (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                      count={bookingsPageCount}
                      page={bookingsPage}
                      onChange={(_, page) => setBookingsPage(page)}
                      color="primary"
                      shape="rounded"
                    />
                  </Box>
                )}
              </>
            )}
          </Box>
        )}
      </Container>

      {/* Flight form dialog */}
      <Dialog
        open={showFlightForm}
        onClose={() => {
          setShowFlightForm(false);
          resetFlightForm();
        }}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {editingFlight ? 'Edit Flight' : 'Add New Flight'}
            </Typography>
            <IconButton
              size="small"
              onClick={() => {
                setShowFlightForm(false);
                resetFlightForm();
              }}
            >
              ✕
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box
            component="form"
            onSubmit={handleFlightSubmit}
            sx={{ mt: 1, '& .MuiTextField-root': { mb: 2 } }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Flight Number"
                  fullWidth
                  required
                  value={flightForm.flightNumber}
                  onChange={(e) => handleFlightFormChange('flightNumber', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Airline"
                  fullWidth
                  required
                  value={flightForm.airline}
                  onChange={(e) => handleFlightFormChange('airline', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="From"
                  fullWidth
                  required
                  value={flightForm.from}
                  onChange={(e) => handleFlightFormChange('from', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="To"
                  fullWidth
                  required
                  value={flightForm.to}
                  onChange={(e) => handleFlightFormChange('to', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date"
                  type="date"
                  fullWidth
                  required
                  value={flightForm.date}
                  onChange={(e) => handleFlightFormChange('date', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Price"
                  type="number"
                  fullWidth
                  required
                  value={flightForm.price}
                  onChange={(e) => handleFlightFormChange('price', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Departure Time"
                  type="time"
                  fullWidth
                  required
                  value={flightForm.departureTime}
                  onChange={(e) => handleFlightFormChange('departureTime', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Arrival Time"
                  type="time"
                  fullWidth
                  required
                  value={flightForm.arrivalTime}
                  onChange={(e) => handleFlightFormChange('arrivalTime', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Logo URL"
                  fullWidth
                  required
                  value={flightForm.logo}
                  onChange={(e) => handleFlightFormChange('logo', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Available Seats"
                  type="number"
                  fullWidth
                  required
                  value={flightForm.availableSeats}
                  onChange={(e) => handleFlightFormChange('availableSeats', e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button
            onClick={() => {
              setShowFlightForm(false);
              resetFlightForm();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleFlightSubmit}
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Saving...' : editingFlight ? 'Update Flight' : 'Add Flight'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Global admin notifications */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleNotificationClose}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminDashboard;
