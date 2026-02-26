import DialogContentText from "@mui/material/DialogContentText";
import { useDispatch, useSelector } from "react-redux";
import { handleClose } from "../../redux/slices/alertSlice";
import DialogWindow from "../dialogWindow/DialogWindow";
import { useCallback, useMemo } from "react";

export default function AlertDialog() {
  const { isOpen, message, title } = useSelector((state) => state.alert);

  const dispatch = useDispatch();

  const onClose = useCallback(() => {
    dispatch(handleClose());
  }, []);

  const dialogButtons = useMemo(() => {
    return [
      {
        buttonText: "Ок",
        buttonAction: onClose,
        id: "close",
      },
    ];
  }, [onClose]);

  return (
    <>
      <DialogWindow
        title={title}
        handleClose={onClose}
        isOpen={isOpen}
        buttons={dialogButtons}
      >
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogWindow>
    </>
  );
}
