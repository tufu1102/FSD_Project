import React, { useState, useEffect } from 'react';
import {
  Snackbar,
  Alert,
  Slide,
  IconButton
} from '@mui/material';
import {
  Close,
  CheckCircle,
  Error,
  Info
} from '@mui/icons-material';

const Notification = ({ message, type = 'success', onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Allow fade out animation
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle />;
      case 'error':
        return <Error />;
      case 'info':
        return <Info />;
      default:
        return <CheckCircle />;
    }
  };

  const getSeverity = () => {
    switch (type) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'info':
        return 'info';
      default:
        return 'success';
    }
  };

  if (!isVisible) return null;

  return (
    <Snackbar
      open={isVisible}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      TransitionComponent={Slide}
      TransitionProps={{ direction: 'left' }}
      sx={{
        '& .MuiSnackbarContent-root': {
          borderRadius: 2,
          boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.15)'
        }
      }}
    >
      <Alert
        onClose={handleClose}
        severity={getSeverity()}
        icon={getIcon()}
        sx={{
          width: '100%',
          borderRadius: 2,
          fontWeight: 500,
          '& .MuiAlert-icon': {
            fontSize: 20
          }
        }}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
            sx={{ ml: 1 }}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;