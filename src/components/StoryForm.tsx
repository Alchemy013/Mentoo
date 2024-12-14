import React, { useState } from 'react';
import { TextField, Select, MenuItem, Button, Box, Typography, FormControl, InputLabel } from '@mui/material';
import type { StoryFormData } from '../types';

interface Props {
  onSubmit: (story: StoryFormData) => void;
}

export default function StoryForm({ onSubmit }: Props) {
  const [formData, setFormData] = useState<StoryFormData>({
    title: '',
    author: 'Anonymous',
    category: 'Legal',
    content: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      author: 'Anonymous',
      category: 'Legal',
      content: ''
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h6" gutterBottom>Share Your Story</Typography>
      
      <TextField
        fullWidth
        label="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="Your Name (or Anonymous)"
        value={formData.author}
        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          value={formData.category}
          label="Category"
          onChange={(e) => setFormData({ ...formData, category: e.target.value as StoryFormData['category'] })}
        >
          <MenuItem value="Legal">Legal</MenuItem>
          <MenuItem value="Workplace">Workplace</MenuItem>
          <MenuItem value="Personal">Personal</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Your Story"
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        margin="normal"
        required
        multiline
        rows={6}
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