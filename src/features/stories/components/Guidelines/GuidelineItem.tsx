import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { IconType } from 'react-icons';

interface Props {
  Icon: IconType;
  text: string;
}

export function GuidelineItem({ Icon, text }: Props) {
  return (
    <ListItem>
      <ListItemIcon><Icon /></ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
}