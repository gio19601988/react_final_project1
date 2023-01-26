import { Button, FormControl } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "../../application";
import { saveProduct, useSelectedProduct } from "../../redux";
import { TextFieldComponent } from "../shared/TextFields";
// import FileBase from `react-file-base64`
import FileBase from "react-file-base64";
import { useNavigate } from "react-router-dom";

const generateAddProdctFormValues = (selectedProduct) => {
  return {
    name: {
      value: selectedProduct?.name || "",
      required: true,
      Error: "",
      validateInput: (name) =>
        name.length > 1 ? null : "name should have at least 2 character",
    },
    description: {
      value: selectedProduct?.description || "",
      required: true,
      Error: "",
      validateInput: (description) =>
        description.length > 1
          ? null
          : "description should have at least 2 character",
    },
    category: {
      value: selectedProduct?.category || "",
      required: true,
      Error: "",
      validateInput: (category) =>
        category.length > 1
          ? null
          : "category should have at least 2 character",
    },
    brand: {
      value: selectedProduct?.brand || "",
      required: true,
      Error: "",
      validateInput: (brand) =>
        brand.length > 1 ? null : "brand should have at least 2 character",
    },
    price: {
      value: selectedProduct?.price || "",
      required: true,
      Error: "",
      validateInput: (price) =>
        price.length > 1 ? null : "price should have at least 2 character",
    },
  };
};

const ProductForm = () => {
  const {
    formValues: productFormValues,
    onInputChange,
    setFormValues,
  } = useForm({
    defaultFotmValues: generateAddProdctFormValues(),
  });

  const selectedProduct = useSelectedProduct();
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSaveProduct = () => {
    const name = productFormValues.name.value;
    const description = productFormValues.description.value;
    const category = productFormValues.category.value;
    const brand = productFormValues.brand.value;
    const price = productFormValues.price.value;
    dispatch(
      saveProduct({
        product: {
          name,
          description,
          category,
          brand,
          price,
          image,
          id: selectedProduct?._id,
        },
        isUpdating: !!selectedProduct,
      })
    )
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };
  useEffect(() => {
    if (selectedProduct) {
      setFormValues(generateAddProdctFormValues(selectedProduct));
      setImage(selectedProduct.image);
    }
  }, [selectedProduct]);

  return (
    <FormControl fullWidth>
      <TextFieldComponent
        name="name"
        value={productFormValues.name.value}
        onChange={onInputChange}
        error={productFormValues.name.error}
        helperText={productFormValues.name.error}
        label="name"
      />
      <TextFieldComponent
        name="description"
        value={productFormValues.description.value}
        onChange={onInputChange}
        error={productFormValues.description.error}
        helperText={productFormValues.description.error}
        label="description"
      />
      <TextFieldComponent
        name="category"
        value={productFormValues.category.value}
        onChange={onInputChange}
        error={productFormValues.category.error}
        helperText={productFormValues.category.error}
        label="category"
      />
      <TextFieldComponent
        name="brand"
        value={productFormValues.brand.value}
        onChange={onInputChange}
        error={productFormValues.brand.error}
        helperText={productFormValues.brand.error}
        label="brand"
      />
      <TextFieldComponent
        name="price"
        value={productFormValues.price.value}
        onChange={onInputChange}
        error={productFormValues.price.error}
        helperText={productFormValues.price.error}
        label="price"
      />
      <FileBase
        type="file"
        multiple={false}
        onDone={(base64) => {
          console.log("base64", base64.base64);
          setImage(base64.base64);
        }}
      />
      <Button onClick={onSaveProduct}>SAVE</Button>
    </FormControl>
  );
};

export default ProductForm;
