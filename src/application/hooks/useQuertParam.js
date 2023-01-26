import React from "react";
import { parsePath, useSearchParams } from "react-router-dom";

export const useQuertParam = (key) => {
  const [params, setParams] = useSearchParams();
  const changeQueryValue = (key, value) => {
    params.set(key, value);
    setParams(params);
  };
  return {
    value: params.get(key),
    changeQueryValue,
  };
};
