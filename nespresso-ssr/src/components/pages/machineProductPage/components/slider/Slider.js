import { Box } from "@mui/material";
import { useState } from "react";
import { ItemImg, SliderGeneralImage, SliderItem, SliderItems } from "./styles";

export default function Slider({ images, title }) {
  const [currImage, setCurrImage] = useState(0);

  const items = images.map((img, i) => {
    return (
      <SliderItem
        onClick={() => setCurrImage(i)}
        key={i}
        className={currImage === i ? "active" : null}
        data-url={img}
      >
        <ItemImg src={img} alt={`${title} - slide ${i + 1}`} />
      </SliderItem>
    );
  });

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <SliderGeneralImage
        large={images[currImage]}
        small={images[currImage]}
        alt={title}
      />
      <SliderItems>{items}</SliderItems>
    </Box>
  );
}
