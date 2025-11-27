import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider
} from '@mui/material';
import { 
  FlightTakeoff, 
  Person, 
  Logout,
  AdminPanelSettings,
  Menu as MenuIcon
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    setAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ 
        backgroundColor: 'white', 
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'grey.200'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1, maxWidth: '1200px', mx: 'auto', width: '100%' }}>
        <Box 
          component={Link} 
          to="/" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            textDecoration: 'none', 
            color: 'primary.main',
            '&:hover': {
              transform: 'scale(1.02)',
              transition: 'transform 0.2s ease'
            }
          }}
        >
          <FlightTakeoff sx={{ mr: 1, fontSize: 28 }} />
          <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
            SkyReserve
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isAuthenticated ? (
            <>
              <Button
                component={Link}
                to="/my-bookings"
                startIcon={<Person />}
                sx={{ 
                  color: 'text.primary', 
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'grey.50'
                  }
                }}
              >
                My Bookings
              </Button>
              {isAdmin && (
                <Button
                  component={Link}
                  to="/admin"
                  startIcon={<AdminPanelSettings />}
                  sx={{ 
                    color: 'text.primary', 
                    fontWeight: 500,
                    '&:hover': {
                      backgroundColor: 'grey.50'
                    }
                  }}
                >
                  Admin
                </Button>
              )}
              <IconButton
                onClick={handleMenuOpen}
                sx={{ ml: 1 }}
              >
                <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main' }}>
                  {user?.name?.charAt(0)?.toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 200,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
                    borderRadius: 2
                  }
                }}
              >
                <MenuItem disabled>
                  <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    {user?.name}
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <Logout sx={{ mr: 1, fontSize: 20 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{ 
                  color: 'text.primary', 
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'grey.50'
                  }
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                sx={{ 
                  backgroundColor: 'primary.main',
                  px: 3,
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                    transform: 'translateY(-1px)',
                    boxShadow: '0px 4px 12px rgba(255, 56, 92, 0.3)'
                  }
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;