import React from 'react';
import { Box, Typography } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { StoryList } from './components/StoryList';
import { StoryForm } from './components/StoryForm';
import { Guidelines } from './components/Guidelines';
import { SignInPrompt } from './components/SignInPrompt';
import { useStories } from './hooks/useStories';
import { useAuth } from '../auth/context/AuthContext';
import { AuthModal } from '../auth/components/AuthModal';

export function StoryGrid() {
  const { stories, loading, addStory, likeStory, hasPostedStory } = useStories();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  return (
    <>
      <Toaster position="top-right" />
      <Box sx={{ display: 'grid', gridTemplateColumns: { md: '1fr 300px' }, gap: 4 }}>
        <Box>
          <Typography variant="h5" gutterBottom>Recent Stories</Typography>
          <StoryList 
            stories={stories} 
            loading={loading} 
            onLike={likeStory}
          />
        </Box>
        <Box>
          {!user ? (
            <SignInPrompt onSignInClick={() => setShowAuthModal(true)} />
          ) : (
            <StoryForm 
              onSubmit={addStory} 
              hasPostedStory={hasPostedStory}
            />
          )}
          <Guidelines />
        </Box>
      </Box>
      <AuthModal 
        open={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
}