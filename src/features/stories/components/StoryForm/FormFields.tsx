import React from 'react';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import type { StoryFormData } from '../../types';

interface Props {
  formData: StoryFormData;
  errors: {
    title?: string;
    content?: string;
  };
  onChange: (field: keyof StoryFormData, value: string) => void;
}

export function FormFields({ formData, errors, onChange }: Props) {
  return (
    <>
      <TextField
        fullWidth
        label="Title"
        value={formData.title}
        onChange={(e) => onChange('title', e.target.value)}
        margin="normal"
        required
        error={!!errors.title}
        helperText={errors.title}
      />

      <TextField
        fullWidth
        label="Your Name (or Anonymous)"
        value={formData.author}
        onChange={(e) => onChange('author', e.target.value)}
        margin="normal"
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          value={formData.category}
          label="Category"
          onChange={(e) => onChange('category', e.target.value as StoryFormData['category'])}
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
        onChange={(e) => onChange('content', e.target.value)}
        margin="normal"
        required
        multiline
        rows={6}
        error={!!errors.content}
        helperText={errors.content || 'Minimum 10 characters required'}
      />
    </>
  );
}