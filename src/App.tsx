import React from 'react';
import { Typography, Box } from '@mui/material';
import { MainLayout } from './layouts/MainLayout';
import { StoryGrid } from './features/stories/StoryGrid';

function App() {
  return (
    <MainLayout>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="subtitle1" color="text.secondary">
          A safe space for men to share their experiences with false accusations
        </Typography>
      </Box>
      <StoryGrid />
    </MainLayout>
  );
}

export default App;