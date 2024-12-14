import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { MdSecurity } from 'react-icons/md';
import { LoginButton } from '../features/auth/components/LoginButton';
import { UserMenu } from '../features/auth/components/UserMenu';
import { useAuth } from '../features/auth/context/AuthContext';

export function Header() {
  const { user, loading } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: '80px !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MdSecurity size={40} style={{ marginRight: '16px', color: '#1976d2' }} />
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 600,
              color: '#1976d2',
              letterSpacing: '-0.5px'
            }}
          >
            MenToo
          </Typography>
        </Box>
        {!loading && (
          <Box sx={{ position: 'relative' }}>
            {user ? <UserMenu /> : <LoginButton />}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}