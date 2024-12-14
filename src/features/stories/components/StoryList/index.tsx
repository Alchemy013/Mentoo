import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { StoryCard } from './StoryCard';
import { EmptyState } from './EmptyState';
import type { Story } from '../../types';

interface Props {
  stories: Story[];
  loading?: boolean;
  onLike: (storyId: string) => void;
}

export function StoryList({ stories, loading = false, onLike }: Props) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (stories.length === 0) {
    return <EmptyState />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {stories.map((story) => (
        <StoryCard 
          key={story.id} 
          story={story} 
          onLike={onLike}
        />
      ))}
    </Box>
  );
}