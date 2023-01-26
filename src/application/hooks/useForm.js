import { useState } from "react";

export const useForm = ({ defaultFotmValues }) => {
  const [formValues, setFormValues] = useState(defaultFotmValues);
  const onInputChange = (e) => {
    const eventName = e.target.name;
    const { validateInput } = formValues[eventName];
    setFormValues((prevFormValues) => {
      return {
        ...prevFormValues,
        [eventName]: {
          ...prevFormValues[eventName],
          value: e.target.value,
          error: validateInput ? validateInput(e.target.value) : "",
        },
      };
    });
  };
  const checkButtonDisable = (values) => {
    for (const [key, objValue] of Object.entries(values)) {
      if (objValue.required && (objValue.error || !objValue.value)) {
        return true;
      }
    }
  };
  const clearForm = (obj) => {
    setFormValues(obj);
  };
  return {
    formValues,
    setFormValues,
    onInputChange,
    checkButtonDisable,
    clearForm,
  };
};

