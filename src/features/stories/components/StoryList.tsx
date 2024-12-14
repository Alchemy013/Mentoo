import React from 'react';
import { Box, Card, CardContent, Typography, Chip, IconButton, Tooltip } from '@mui/material';
import { MdThumbUp } from 'react-icons/md';
import { useAuth } from '../../auth/context/AuthContext';
import type { Story } from '../types';

interface Props {
  stories: Story[];
  onLike: (storyId: string) => void;
}

export function StoryList({ stories, onLike }: Props) {
  const { user } = useAuth();

  if (stories.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1" color="text.secondary">
          No stories have been shared yet. Be the first to share your experience.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {stories.map((story) => (
        <Card key={story.id}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {story.title}
            </Typography>
            <Box sx={{ mb: 2, display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
              <Typography variant="body2" color="text.secondary">
                By {story.author}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • {story.date}
              </Typography>
              <Chip label={story.category} size="small" />
              <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Tooltip title={!user ? 'Sign in to like stories' : story.liked ? 'You already liked this story' : 'Like this story'}>
                  <span>
                    <IconButton
                      onClick={() => onLike(story.id)}
                      color={story.liked ? 'primary' : 'default'}
                      size="small"
                      disabled={!user || story.liked}
                    >
                      <MdThumbUp />
                    </IconButton>
                  </span>
                </Tooltip>
                <Typography variant="body2" color={story.liked ? 'primary.main' : 'text.secondary'}>
                  {story.likes || 0}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body1">
              {story.content}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}