import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Paper,
  Button,
  useTheme
} from '@mui/material';
import {
  FlightTakeoff,
  Security,
  Star,
  TrendingUp,
  SupportAgent,
  Speed
} from '@mui/icons-material';
import FlightList from '../components/FlightList';

const Home = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Best Prices',
      description: 'Competitive pricing with no hidden fees'
    },
    {
      icon: <Security sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Secure Booking',
      description: 'Your data is protected with bank-level security'
    },
    {
      icon: <Star sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Top Airlines',
      description: 'Partnered with the world\'s leading airlines'
    },
    {
      icon: <Speed sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Instant Booking',
      description: 'Book and confirm your flights in seconds'
    },
    {
      icon: <SupportAgent sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: '24/7 Support',
      description: 'Round-the-clock customer service'
    },
    {
      icon: <FlightTakeoff sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Global Reach',
      description: 'Fly to destinations worldwide'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'white',
          color: 'text.primary',
          py: { xs: 12, md: 16 },
          position: 'relative',
          overflow: 'hidden',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* Animated Background Gradients */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 20%, rgba(255, 56, 92, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(0, 166, 153, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(255, 56, 92, 0.05) 0%, transparent 50%)
            `,
            animation: 'gradientShift 8s ease-in-out infinite'
          }}
        />
        
        {/* Animated Flight Paths */}
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            left: '-10%',
            width: '120%',
            height: 2,
            background: 'linear-gradient(90deg, transparent, rgba(255, 56, 92, 0.3), transparent)',
            animation: 'flightPath1 6s linear infinite',
            '&::before': {
              content: '""',
              position: 'absolute',
              right: 0,
              top: -8,
              width: 16,
              height: 16,
              background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%23FF385C\'%3E%3Cpath d=\'M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z\'/%3E%3C/svg%3E")',
              backgroundSize: 'contain',
              animation: 'planeMove 6s linear infinite'
            }
          }}
        />
        
        <Box
          sx={{
            position: 'absolute',
            top: '60%',
            left: '-10%',
            width: '120%',
            height: 2,
            background: 'linear-gradient(90deg, transparent, rgba(0, 166, 153, 0.3), transparent)',
            animation: 'flightPath2 8s linear infinite',
            '&::before': {
              content: '""',
              position: 'absolute',
              right: 0,
              top: -8,
              width: 16,
              height: 16,
              background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%2300A699\'%3E%3Cpath d=\'M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z\'/%3E%3C/svg%3E")',
              backgroundSize: 'contain',
              animation: 'planeMove 8s linear infinite'
            }
          }}
        />
        
        {/* Floating Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '15%',
            right: '10%',
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: 'linear-gradient(45deg, rgba(255, 56, 92, 0.1), rgba(0, 166, 153, 0.1))',
            animation: 'float1 4s ease-in-out infinite'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            left: '15%',
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'linear-gradient(45deg, rgba(0, 166, 153, 0.1), rgba(255, 56, 92, 0.1))',
            animation: 'float2 5s ease-in-out infinite'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '40%',
            left: '5%',
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: 'linear-gradient(45deg, rgba(255, 56, 92, 0.08), rgba(0, 166, 153, 0.08))',
            animation: 'float3 6s ease-in-out infinite'
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', maxWidth: '900px', mx: 'auto' }}>
            {/* Main Headline */}
            <Typography 
              variant="h1" 
              sx={{ 
                fontWeight: 800, 
                mb: 2,
                fontSize: { xs: '3rem', md: '4.5rem', lg: '5.5rem' },
                lineHeight: 1.1,
                letterSpacing: '-0.02em'
              }}
            >
              <Box component="span" sx={{ color: 'text.primary' }}>
                Book Your
              </Box>
              <br />
              <Box component="span" sx={{ 
                background: 'linear-gradient(45deg, #FF385C, #00A699)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradientText 3s ease-in-out infinite'
              }}>
                Dream Flight
              </Box>
            </Typography>

            {/* Animated Flight Icon */}
            <Box sx={{ my: 4 }}>
              <FlightTakeoff 
                sx={{ 
                  fontSize: { xs: 60, md: 80 },
                  background: 'linear-gradient(45deg, #FF385C, #00A699)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))',
                  animation: 'iconPulse 2s ease-in-out infinite'
                }} 
              />
            </Box>

            {/* Descriptive Text */}
            <Typography 
              variant="h4" 
              sx={{ 
                mb: 3,
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 400,
                lineHeight: 1.4,
                color: 'text.primary'
              }}
            >
              Book and confirm your flights in just minutes.
            </Typography>
            
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 6,
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                fontWeight: 300,
                color: 'text.secondary',
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              Modern booking solutions, lightning-fast confirmation, zero compromise on quality.
            </Typography>

            {/* CTA Button */}
            <Button
              variant="contained"
              size="large"
              href="#flights"
              sx={{
                py: 2,
                px: 6,
                fontSize: '1.2rem',
                fontWeight: 600,
                borderRadius: 3,
                bgcolor: 'secondary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'secondary.dark',
                  transform: 'translateY(-3px)',
                  boxShadow: '0px 8px 25px rgba(0, 166, 153, 0.4)'
                },
                transition: 'all 0.3s ease',
                boxShadow: '0px 4px 15px rgba(0, 166, 153, 0.3)'
              }}
            >
              Let's Fly Together
              <FlightTakeoff sx={{ ml: 1, fontSize: 24 }} />
            </Button>
          </Box>
        </Container>
      </Box>
      
      {/* Main Content */}
      <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh' }}>
        <FlightList />
      </Box>
    </Box>
  );
};

export default Home;