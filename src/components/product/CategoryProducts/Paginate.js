import React from "react";
import Pagination from "@mui/material/Pagination";

export const Paginate = ({ totalPages, currentPage, changePage, queryKey }) => {
  return (
    <Pagination
      count={totalPages}
      page={+currentPage}
      onChange={(_, value) => {
        changePage(queryKey, value);
      }}
    />
  );
};
