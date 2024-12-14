import React, { useState } from 'react';
import { TextField, Button, Box, Alert, Typography } from '@mui/material';
import { MdPersonAdd } from 'react-icons/md';
import { supabase } from '../../../lib/supabase';

interface Props {
  onSuccess: () => void;
}

export function SignUpForm({ onSuccess }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      setSuccess(true);
      setTimeout(onSuccess, 3000);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Alert severity="success">
        Registration successful! Please check your email to verify your account.
        Closing in a few seconds...
      </Alert>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Join our community to share your experiences and support others.
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
        helperText="At least 6 characters"
      />

      <TextField
        fullWidth
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        margin="normal"
        required
      />

      <Button 
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={loading}
        startIcon={<MdPersonAdd />}
        sx={{ mt: 3 }}
      >
        {loading ? 'Creating account...' : 'Create Account'}
      </Button>
    </Box>
  );
}