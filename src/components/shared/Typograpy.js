import { Typography } from "@mui/material";
import React from "react";

export const TypograpyComponent = ({ variant = "outline", children }) => {
  return <Typography variant={variant}>{children}</Typography>;
};
