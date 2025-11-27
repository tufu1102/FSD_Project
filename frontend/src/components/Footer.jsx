import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  Divider,
  IconButton
} from '@mui/material';
import {
  FlightTakeoff,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Email,
  Phone,
  LocationOn
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'grey.900',
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <FlightTakeoff sx={{ fontSize: 32, color: 'primary.main', mr: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                SkyReserve
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'grey.300', mb: 3, lineHeight: 1.6 }}>
              Your trusted partner for flight bookings. Book with confidence and fly with ease.
              Experience the world with our premium flight booking service.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton sx={{ color: 'grey.300', '&:hover': { color: 'primary.main' } }}>
                <Facebook />
              </IconButton>
              <IconButton sx={{ color: 'grey.300', '&:hover': { color: 'primary.main' } }}>
                <Twitter />
              </IconButton>
              <IconButton sx={{ color: 'grey.300', '&:hover': { color: 'primary.main' } }}>
                <Instagram />
              </IconButton>
              <IconButton sx={{ color: 'grey.300', '&:hover': { color: 'primary.main' } }}>
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Home
              </Link>
              <Link href="/my-bookings" sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                My Bookings
              </Link>
              <Link href="/login" sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Login
              </Link>
              <Link href="/signup" sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
                Sign Up
              </Link>
            </Box>
          </Grid>

          {/* Services */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
              Services
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" sx={{ color: 'grey.300' }}>
                Flight Booking
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.300' }}>
                Hotel Reservations
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.300' }}>
                Travel Insurance
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.300' }}>
                Car Rental
              </Typography>
            </Box>
          </Grid>

          {/* Support */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" sx={{ color: 'grey.300' }}>
                Help Center
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.300' }}>
                Contact Us
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.300' }}>
                FAQ
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.300' }}>
                Terms of Service
              </Typography>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'white' }}>
              Contact
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ fontSize: 16, color: 'primary.main' }} />
                <Typography variant="body2" sx={{ color: 'grey.300' }}>
                  support@skyreserve.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ fontSize: 16, color: 'primary.main' }} />
                <Typography variant="body2" sx={{ color: 'grey.300' }}>
                  +1 (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn sx={{ fontSize: 16, color: 'primary.main' }} />
                <Typography variant="body2" sx={{ color: 'grey.300' }}>
                  New York, NY
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: 'grey.700' }} />

        {/* Bottom */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" sx={{ color: 'grey.400' }}>
            © 2024 SkyReserve. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="#" sx={{ color: 'grey.400', textDecoration: 'none', fontSize: '0.875rem' }}>
              Privacy Policy
            </Link>
            <Link href="#" sx={{ color: 'grey.400', textDecoration: 'none', fontSize: '0.875rem' }}>
              Terms of Use
            </Link>
            <Link href="#" sx={{ color: 'grey.400', textDecoration: 'none', fontSize: '0.875rem' }}>
              Cookie Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;