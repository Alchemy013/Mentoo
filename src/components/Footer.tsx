import React from 'react';
import { Box, Typography } from '@mui/material';

export function Footer() {
  return (
    <Box sx={{ mt: 4, py: 3, textAlign: 'center', borderTop: 1, borderColor: 'divider' }}>
      <Typography variant="body2" color="text.secondary">
        MenToo Platform - A safe space for sharing experiences
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        If you're in immediate need of help, please contact appropriate legal or support services.
      </Typography>
    </Box>
  );
}