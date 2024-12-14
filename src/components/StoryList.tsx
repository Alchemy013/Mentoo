import React from 'react';
import { Box, Card, CardContent, Typography, Chip } from '@mui/material';
import type { Story } from '../types';

interface Props {
  stories: Story[];
}

export default function StoryList({ stories }: Props) {
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
            <Box sx={{ mb: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                By {story.author}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • {story.date}
              </Typography>
              <Chip label={story.category} size="small" />
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