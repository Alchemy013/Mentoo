import React from 'react';
import { Box, Paper, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { MdInfo, MdSecurity, MdPeople, MdGavel, MdReport } from 'react-icons/md';

export function Guidelines() {
  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>Guidelines</Typography>
      <List>
        <ListItem>
          <ListItemIcon><MdInfo /></ListItemIcon>
          <ListItemText primary="Share your experience respectfully" />
        </ListItem>
        <ListItem>
          <ListItemIcon><MdSecurity /></ListItemIcon>
          <ListItemText primary="Maintain anonymity if preferred" />
        </ListItem>
        <ListItem>
          <ListItemIcon><MdGavel /></ListItemIcon>
          <ListItemText primary="Focus on facts and personal experiences" />
        </ListItem>
        <ListItem>
          <ListItemIcon><MdPeople /></ListItemIcon>
          <ListItemText primary="Be supportive of others" />
        </ListItem>
        <ListItem>
          <ListItemIcon><MdReport /></ListItemIcon>
          <ListItemText primary="Avoid hate speech or discrimination" />
        </ListItem>
      </List>
    </Paper>
  );
}