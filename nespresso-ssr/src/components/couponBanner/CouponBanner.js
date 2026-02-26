import { useEffect, useState } from "react";

import { Box, DialogContent, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Blur,
  StyledDialog,
  StyledDialogContentText,
  StyledDialogTitle,
} from "./styles";

import CoffeeService from "../../services/CoffeeService";
import replaceSpacesWithBr from "../../utils/replaceSpacesWithBr";

const { getBanner } = new CoffeeService();

const CouponBanner = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    getBanner().then((banner) => {
      setBanner(banner);
    });
  }, []);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    const openDialog = () => {
      setTimeout(() => {
        handleDialogOpen();
      }, 3000);
    };

    window.addEventListener("scroll", openDialog, { once: true });

    return () => {
      window.removeEventListener("scroll", openDialog);
    };
  }, []);

  return (
    <StyledDialog
      open={isDialogOpen}
      maxWidth={"md"}
      sx={{
        ".MuiPaper-elevation": {
          background: `url(${banner?.img}) center center / cover no-repeat`,
        },
      }}
      fullWidth
      onClose={handleDialogClose}
    >
      <Blur />
      <Box sx={{ position: "absolute", top: 0, right: 0 }}>
        <IconButton onClick={handleDialogClose}>
          <CancelIcon sx={{ color: "white", zIndex: "6" }} />
        </IconButton>
      </Box>
      <StyledDialogTitle>{banner?.title}</StyledDialogTitle>
      <DialogContent sx={{ zIndex: "8" }}>
        {/* {rewards.map((reward) => (
                    <StyledDialogContentText key={reward.minOrder}>
                        При заказе от {reward.minOrder} упаковок - <span>{reward.gifts} упаковк{reward.gifts > 1 ? 'и' : 'а'} в подарок!</span>
                    </StyledDialogContentText>
                ))} */}
        <StyledDialogContentText
          dangerouslySetInnerHTML={{
            __html: banner ? replaceSpacesWithBr(banner.promo_description) : "",
          }}
        ></StyledDialogContentText>
      </DialogContent>
    </StyledDialog>
  );
};

export default CouponBanner;
