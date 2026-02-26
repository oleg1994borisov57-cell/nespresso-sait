import { Box, useTheme } from "@mui/material";
import InfoOptionItem from "../infoOptionItem/InfoOptionItem";

export default function InfoOptions({ options }) {
  const theme = useTheme();

  const items = options.map(({ ...props }, i) => {
    return <InfoOptionItem {...props} key={i} />;
  });

  return (
    <Box
      sx={{
        display: "flex",
        [theme.breakpoints.down(998)]: {
          display: "none",
        },
      }}
    >
      {items}
    </Box>
  );
}
