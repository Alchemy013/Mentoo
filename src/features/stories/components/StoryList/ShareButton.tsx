import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { MdShare, MdContentCopy, MdFacebook, MdTwitter, MdWhatsapp } from 'react-icons/md';
import { toast } from 'react-hot-toast';

interface Props {
  title: string;
  content: string;
}

export function ShareButton({ title, content }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getShareUrl = () => {
    const baseUrl = window.location.origin;
    const text = encodeURIComponent(`${title}\n\n${content.slice(0, 100)}...`);
    return `${baseUrl}?story=${encodeURIComponent(title)}`;
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      toast.success('Link copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy link');
    }
    handleClose();
  };

  const handleShare = (platform: string) => {
    const url = getShareUrl();
    const text = encodeURIComponent(`${title}\n\nRead more at:`);
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
    handleClose();
  };

  return (
    <>
      <Tooltip title="Share story">
        <IconButton onClick={handleClick} size="small">
          <MdShare />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleCopyLink}>
          <MdContentCopy style={{ marginRight: 8 }} />
          Copy Link
        </MenuItem>
        <MenuItem onClick={() => handleShare('facebook')}>
          <MdFacebook style={{ marginRight: 8 }} />
          Share on Facebook
        </MenuItem>
        <MenuItem onClick={() => handleShare('twitter')}>
          <MdTwitter style={{ marginRight: 8 }} />
          Share on Twitter
        </MenuItem>
        <MenuItem onClick={() => handleShare('whatsapp')}>
          <MdWhatsapp style={{ marginRight: 8 }} />
          Share on WhatsApp
        </MenuItem>
      </Menu>
    </>
  );
}