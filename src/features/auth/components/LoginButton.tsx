import React, { useState } from 'react';
import { Button } from '@mui/material';
import { MdLogin } from 'react-icons/md';
import { AuthModal } from './AuthModal';

export function LoginButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setOpen(true)}
        startIcon={<MdLogin />}
      >
        Sign In
      </Button>

      <AuthModal 
        open={open} 
        onClose={() => setOpen(false)} 
      />
    </>
  );
}