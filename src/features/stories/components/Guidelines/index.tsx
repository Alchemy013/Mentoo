import React from 'react';
import { Paper, Typography, List } from '@mui/material';
import { MdInfo, MdSecurity, MdPeople, MdGavel, MdReport } from 'react-icons/md';
import { GuidelineItem } from './GuidelineItem';
import { GUIDELINES } from '../../constants';

export function Guidelines() {
  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>Guidelines</Typography>
      <List>
        {GUIDELINES.map((guideline, index) => (
          <GuidelineItem
            key={index}
            Icon={guideline.icon}
            text={guideline.text}
          />
        ))}
      </List>
    </Paper>
  );
}