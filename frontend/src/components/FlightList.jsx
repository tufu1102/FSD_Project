import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Paper,
  InputAdornment,
  Chip
} from '@mui/material';
import {
  Search,
  Clear,
  FlightTakeoff,
  CalendarToday,
  Business
} from '@mui/icons-material';
import axios from 'axios';
import { API_BASE_URL } from '../api';
import FlightCard from './FlightCard';

const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    from: '',
    to: '',
    date: '',
    airline: ''
  });

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      setError('');
      const params = new URLSearchParams();
      
      if (filters.from) params.append('from', filters.from);
      if (filters.to) params.append('to', filters.to);
      if (filters.date) params.append('date', filters.date);
      if (filters.airline) params.append('airline', filters.airline);

      const response = await axios.get(`${API_BASE_URL}/api/flights?${params.toString()}`);
      setFlights(response.data.flights);
    } catch (error) {
      setError('Failed to fetch flights. Please try again.');
      console.error('Error fetching flights:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFlights();
  };

  const clearFilters = () => {
    setFilters({
      from: '',
      to: '',
      date: '',
      airline: ''
    });
    fetchFlights();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
        <CircularProgress size={60} sx={{ mb: 2 }} />
        <Typography variant="h6" sx={{ color: 'text.secondary' }}>
          Loading flights...
        </Typography>
      </Box>
    );
  }

  return (
    <Box id="flights" sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
      {/* Search Filters */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 4, 
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'grey.200',
          bgcolor: 'white'
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'text.primary' }}>
          Search Flights
        </Typography>
        
        <Box component="form" onSubmit={handleSearch}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="From"
                name="from"
                value={filters.from}
                onChange={handleFilterChange}
                placeholder="Departure city"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FlightTakeoff sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="To"
                name="to"
                value={filters.to}
                onChange={handleFilterChange}
                placeholder="Destination city"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FlightTakeoff sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Date"
                name="date"
                type="date"
                value={filters.date}
                onChange={handleFilterChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarToday sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Airline"
                name="airline"
                value={filters.airline}
                onChange={handleFilterChange}
                placeholder="Airline name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Business sx={{ color: 'text.secondary' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              startIcon={<Search />}
              sx={{ 
                px: 4,
                py: 1.5,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0px 6px 20px rgba(255, 56, 92, 0.3)'
                }
              }}
            >
              Search Flights
            </Button>
            <Button
              variant="outlined"
              onClick={clearFilters}
              startIcon={<Clear />}
              sx={{ px: 4, py: 1.5 }}
            >
              Clear Filters
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Results */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>
            Available Flights
          </Typography>
          <Chip 
            label={`${flights.length} flights found`} 
            color="primary" 
            variant="outlined"
            sx={{ fontWeight: 500 }}
          />
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {flights.length === 0 ? (
        <Paper 
          elevation={0} 
          sx={{ 
            p: 6, 
            textAlign: 'center',
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'grey.200',
            bgcolor: 'white'
          }}
        >
          <FlightTakeoff sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
          <Typography variant="h6" sx={{ mb: 1, color: 'text.primary' }}>
            No flights found
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            No flights match your search criteria. Try adjusting your filters.
          </Typography>
          <Button
            variant="contained"
            onClick={clearFilters}
            sx={{
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0px 6px 20px rgba(255, 56, 92, 0.3)'
              }
            }}
          >
            Show All Flights
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {flights.map(flight => (
            <Grid item xs={12} sm={6} lg={4} key={flight._id}>
              <FlightCard flight={flight} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FlightList;