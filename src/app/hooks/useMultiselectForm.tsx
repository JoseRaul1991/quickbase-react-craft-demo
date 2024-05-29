import { useState, useEffect } from "react";
import {
  MultiselectFormValues,
  INITIAL_VALUES,
  includeDefaultValueInChoices,
} from "../models/multi-select-form";
import { useMultiselect } from "./useMultiselect";
import { filterNonEmptyValues } from "../utils/filter-non-empty-values";
import { validationSchema } from "../models/multi-select-form-schema";
import { FormError, reduceToFormError } from "../models/form-error";

export const useMultiselectForm = () => {
  const { multiselect, updateMultiselect } = useMultiselect();
  const [formData, setFormData] =
    useState<MultiselectFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormError>({});

  const currentChoicesLength =
    formData.choices?.filter(filterNonEmptyValues).length || 0;

  useEffect(() => {
    if (multiselect) {
      setFormData(multiselect);
    }
  }, [multiselect]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = event.target as HTMLInputElement;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleChoicesOnChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      choices: event.target.value.split("\n"),
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      const readyFormData = includeDefaultValueInChoices(formData);
      updateMultiselect(readyFormData);
    } catch (error: any) {
      setErrors(error.inner.reduce(reduceToFormError, {}));
    }
  };

  return {
    formData,
    errors,
    currentChoicesLength,
    handleChange,
    handleChoicesOnChange,
    handleSubmit,
  };
};
