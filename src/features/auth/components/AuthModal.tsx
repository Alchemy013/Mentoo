import React from 'react';
import { Dialog, DialogContent, DialogTitle, Box, Tabs, Tab, IconButton } from '@mui/material';
import { MdClose } from 'react-icons/md';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function AuthModal({ open, onClose }: Props) {
  const [tab, setTab] = React.useState(0);

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }
      }}
    >
      <DialogTitle sx={{ pb: 1, pr: 6 }}>
        Welcome to MenToo
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <MdClose />
        </IconButton>
      </DialogTitle>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="fullWidth">
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>
      </Box>

      <DialogContent sx={{ pt: 3 }}>
        {tab === 0 ? (
          <LoginForm onSuccess={onClose} />
        ) : (
          <SignUpForm onSuccess={onClose} />
        )}
      </DialogContent>
    </Dialog>
  );
}