// import {IconButton} from "./../ModalImage"
import { IconButton, styled } from "@mui/material"

export const ReactModalStyle = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '0',
      border: 'none',
      background: 'none',
      overflow: 'hidden',
      zIndex: 9999,
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 9999,
    },
  }
  

export const IconButtonLeft = {
    left: 10,
  }
  
export const IconButtonRight = {
    right: 10,
  }

export const IconButtonStyle = styled(IconButton)({
  position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
})