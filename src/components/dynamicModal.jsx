import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DynamicModal = ({ show, onHide, title, children, actions }) => {
  return (
    <Dialog
      open={show}
      onClose={onHide}
      fullWidth
      maxWidth="sm"
      aria-labelledby="modal-title"
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Typography>{title}</Typography>
        <IconButton
          aria-label="close"
          onClick={onHide}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>{children}</DialogContent>

      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

export default DynamicModal;
