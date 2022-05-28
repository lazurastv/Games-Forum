import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export interface SimpleDialogProps {
  open: boolean;
  handleClose: () => void;
}

export default function ArticleSavedPopup(props: SimpleDialogProps) {
  const { handleClose, open } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        {"Zapisano artykuł"}
      </DialogTitle>
    
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Artykuł został zapisany.
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>
            OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
