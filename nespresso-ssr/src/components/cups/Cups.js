import { memo, useMemo } from "react";
import { cupsList } from "./cupsList";
import { Box } from "@mui/material";

import isEqual from "lodash/isEqual";

const Cups = ({ cupsizes, color, isProductPage }) => {
  const items = useMemo(() => {
    if (!cupsizes) return;
    const items = [];

    cupsizes.forEach((cupsize, i) => {
      if (isProductPage) {
        items.push(
          <Box
            key={i}
            className="product-cupsizes-info-element"
            sx={{
              width: cupsizes.length > 1 ? "50%" : "100%",
              "& svg": {
                color: color,
              },
            }}
          >
            {cupsList[cupsize]}
          </Box>
        );
      } else if (i === 0) {
        items.push(
          <Box
            key={i}
            className="cups"
            sx={{
              "& svg": {
                color: color,
              },
            }}
          >
            {cupsList[cupsize]}
          </Box>
        );
      }
    });

    return items;
  }, [cupsizes, isProductPage]);

  return <>{items}</>;
};

const areEqual = (prevProps, nextProps) => {
  return isEqual(prevProps.cupsizes, nextProps.cupsizes);
};

export default memo(Cups, areEqual);
