import React from "react";
import { Rating as MuiRaiting } from "@mui/material";

export const Rating = ({ value, isDisabled, onChange }) => {
  return (
    <MuiRaiting
      value={value}
      disabled={isDisabled}
      onChange={onChange}
      precision={0.5}
    />
  );
};
