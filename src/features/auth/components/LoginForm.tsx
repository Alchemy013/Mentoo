import React, { useState } from 'react';
import { TextField, Button, Box, Alert, Typography } from '@mui/material';
import { MdLogin } from 'react-icons/md';
import { supabase } from '../../../lib/supabase';

interface Props {
  onSuccess: () => void;
}

export function LoginForm({ onSuccess }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      onSuccess();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Sign in to share your story and support others in the community.
      </Typography>

      <TextField
        fullWidth
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        required
        autoFocus
      />
      
      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        required
      />

      <Button 
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={loading}
        startIcon={<MdLogin />}
        sx={{ mt: 3 }}
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>
    </Box>
  );
}