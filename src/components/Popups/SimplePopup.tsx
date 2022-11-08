import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export interface SimpleDialogProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  content: string;
}

export default function SimplePopup(props: SimpleDialogProps) {
  const { handleClose, open, title, content } = props;

  return (
    <Dialog
      PaperProps={{
        style: {
          backgroundColor: "secondary.main"
        },
      }}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        {title}
      </DialogTitle>
    
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button
          sx={{
            width: {
              sm: "100%",
              md: "50px",
            },
          }}
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleClose}>
            OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
