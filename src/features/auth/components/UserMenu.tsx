import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { MdPerson } from 'react-icons/md';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../context/AuthContext';

export function UserMenu() {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    handleClose();
  };

  if (!user) return null;

  return (
    <>
      <IconButton onClick={handleMenu} sx={{ p: 0 }}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          <MdPerson />
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem disabled>
          {user.email}
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          Sign Out
        </MenuItem>
      </Menu>
    </>
  );
}