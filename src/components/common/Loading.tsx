import React from "react";
import { Box, CircularProgress } from "@material-ui/core";

const Loading = () => (
  <Box
    top={0}
    left={0}
    bottom={0}
    right={0}
    position="absolute"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <CircularProgress />
  </Box>
);

export default Loading;
