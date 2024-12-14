import React from 'react';
import { Button, Box, Typography, Alert } from '@mui/material';
import { FormFields } from './FormFields';
import { useStoryForm } from '../../hooks/useStoryForm';
import { useAuth } from '../../../auth/context/AuthContext';
import type { StoryFormData } from '../../types';

interface Props {
  onSubmit: (story: StoryFormData) => void;
  hasPostedStory: boolean;
}

export function StoryForm({ onSubmit, hasPostedStory }: Props) {
  const { user } = useAuth();
  const { formData, errors, handleChange, handleSubmit } = useStoryForm(onSubmit);

  if (!user) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">
          Please sign in to share your story
        </Alert>
      </Box>
    );
  }

  if (hasPostedStory) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="info">
          You have already shared your story. Thank you for contributing to our community.
        </Alert>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h6" gutterBottom>Share Your Story</Typography>
      <FormFields 
        formData={formData} 
        errors={errors} 
        onChange={handleChange} 
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        fullWidth 
        sx={{ mt: 2 }}
      >
        Share Story
      </Button>
    </Box>
  );
}