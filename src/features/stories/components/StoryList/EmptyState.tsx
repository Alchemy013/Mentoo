import React from 'react';
import { Box, Typography } from '@mui/material';

export function EmptyState() {
  return (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Typography variant="body1" color="text.secondary">
        No stories have been shared yet. Be the first to share your experience.
      </Typography>
    </Box>
  );
}