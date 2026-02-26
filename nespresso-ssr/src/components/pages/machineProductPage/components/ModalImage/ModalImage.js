import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {ReactModalStyle, IconButtonStyle} from "./styles/index"

if (typeof window !== 'undefined') {
  ReactModal.setAppElement('#__next');
}


export const ModalImage = ({ src, alt, nextImage, prevImage }) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const onRequestClose = closeModal;

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  return (
      <>
      
      {/* <div onClick={openModal} style={{ cursor: "pointer" }}> */}
        <img
          onClick={openModal}
          src={src}
          alt={alt}
          style={{ width: "450px", height: "450px", cursor: "pointer" }}
        />
      {/* </div> */}

      
      <ReactModal
        isOpen={isModalOpen }
        onRequestClose={onRequestClose}
        contentLabel="Modal Image"
        style={ReactModalStyle}
      >
        <IconButtonStyle
          onClick={prevImage}
          sx={{left: 10}}
        >
          <ArrowBackIosIcon />
        </IconButtonStyle>

        <img
          src={src}
          alt={alt}
          style={{ maxWidth: '100%',  maxHeight: '90vh', display: 'block' }}
        />

        <IconButtonStyle
          onClick={nextImage}
          sx={{right: 10}}
        >
          <ArrowForwardIosIcon />
        </IconButtonStyle>
      </ReactModal>
    </>
  );
};