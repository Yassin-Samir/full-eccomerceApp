import { CircularProgress } from "@mui/material";
import React from "react";
import Center from "./Center";

function Loading() {
  return (
    <Center>
      <CircularProgress />
    </Center>
  );
}

export default Loading;
