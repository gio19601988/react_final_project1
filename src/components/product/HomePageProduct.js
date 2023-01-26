import React from "react";
import { useHomePageProducts } from "../../redux";
import { GridComponent } from "../shared";
import { ProductCard } from "./ProductCard";

export const HomePageProduct = () => {
  const homePageProducts = useHomePageProducts();
  return (
    <GridComponent>
      {homePageProducts.map((products) => {
        return <ProductCard key={products._id} {...products} />;
      })}
    </GridComponent>
  );
};
