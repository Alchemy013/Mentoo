import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { MdLogin } from 'react-icons/md';

interface Props {
  onSignInClick: () => void;
}

export function SignInPrompt({ onSignInClick }: Props) {
  return (
    <Box 
      sx={{ 
        p: 4, 
        bgcolor: 'white', 
        borderRadius: 2, 
        boxShadow: 1, 
        mb: 3,
        textAlign: 'center'
      }}
    >
      <Typography variant="h6" gutterBottom>
        Share Your Experience
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Join our community to share your story and support others who have faced similar situations.
      </Typography>
      <Button
        variant="contained"
        size="large"
        startIcon={<MdLogin />}
        onClick={onSignInClick}
        sx={{ 
          px: 4,
          py: 1,
          borderRadius: 2,
          textTransform: 'none',
          fontSize: '1.1rem'
        }}
      >
        Sign in to Share Your Story
      </Button>
    </Box>
  );
}