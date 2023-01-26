import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCategoryProducts, useCategoryProducts } from "../../../redux";
import { CategoryProductList } from "./CategoryProductList";
import { Box } from "@mui/system";
import { Paginate } from "./Paginate";
import { useQuertParam } from "../../../application";
import { Sort } from "./Sort";

export const CategoruProducts = () => {
  const dispatch = useDispatch();
  const { value: page, changeQueryValue: changePage } = useQuertParam("page");
  const { value: sort, changeQueryValue: changeSort } = useQuertParam("sort");
  const CategoruProducts = useCategoryProducts();
  const { categoryName } = useParams();
  useEffect(() => {
    dispatch(
      fetchCategoryProducts(`${categoryName}?page=${page}&size=3&sort=${sort}`)
    );
  }, [categoryName, page, sort]);
  return (
    <Box>
      <Sort sort={sort} changePage={changePage} changeSort={changeSort} />
      <CategoryProductList />
      <Paginate
        currentPage={page}
        totalPages={CategoruProducts.totalPages}
        changePage={changePage}
        queryKey="page"
      />
    </Box>
  );
};
