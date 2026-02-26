import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";

export default function DialogWindow({
  title,
  children,
  buttons,
  isOpen,
  handleClose,
  sx,
}) {
  const buttonsItems = buttons.map(({ buttonText, buttonAction, id }) => {
    return (
      <Button key={id} onClick={buttonAction}>
        {buttonText}
      </Button>
    );
  });

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        sx={{ zIndex: "999999999", ...sx }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>{buttonsItems}</DialogActions>
      </Dialog>
    </>
  );
}
