"use client";

import { useEffect, useState } from "react";
import TextareaWithLimit from "./TextareaWithLimit";
import "./MultiselectForm.css";
import {
  INITIAL_VALUES,
  MultiselectFormValues,
  filterFnEmptyChoices,
  validationSchema,
} from "../models/MultiselectForm";
import { CHOICES_CHAR_LIMIT, CHOICES_LIMIT } from "../constants/choices";
import { useMultiselect } from "../hooks/useMultiselect";

const MultiselectForm: React.FC = () => {
  const { multiselect, updateMultiselect } = useMultiselect("mock-id");
  const [formData, setFormData] =
    useState<MultiselectFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const currentLength =
    formData.choices?.filter(filterFnEmptyChoices).length || 0;

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

      const readyFormData = {
        ...formData,
        choices: Array.from(
          new Set(
            [...(formData.choices ?? []), formData.defaultValue ?? ""]?.map(
              (choice) => choice.trim()
            )
          )
        ),
      };
      updateMultiselect(readyFormData);
    } catch (error: any) {
      setErrors(
        error.inner.reduce(
          (acc: Record<string, string>, err: any) => ({
            ...acc,
            [err.path]: err.message,
          }),
          {}
        )
      );
    }
  };
  return (
    <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
      <fieldset>
        <label>Label:</label>
        <input
          className="field flex-1"
          type="text"
          name="label"
          placeholder="Enter field label"
          onChange={handleChange}
          value={formData.label}
        />
        <div className="error">
          {errors.label && (
            <span className="text-red-500 text-sm">{errors.label}</span>
          )}
        </div>
      </fieldset>
      <fieldset>
        <label>Is Required:</label>
        <div className="flex gap-4 items-center">
          Multi-select
          <input
            className="h-6 w-6 -mr-4"
            type="checkbox"
            name="isRequired"
            checked={formData.isRequired}
            onChange={handleChange}
          />
          <label className="text-sm text-slate-600">A Value is Required</label>
        </div>
      </fieldset>
      <fieldset>
        <label>Default Value:</label>
        <input
          className="field flex-1"
          type="text"
          name="defaultValue"
          placeholder="Enter a default value"
          onChange={handleChange}
          value={formData.defaultValue}
        />
        <div className="error">
          {errors.defaultValue && (
            <span className="text-red-500 text-sm">{errors.defaultValue}</span>
          )}
        </div>
      </fieldset>
      <fieldset className="h-40 relative">
        <label>Choices:</label>
        <TextareaWithLimit
          className="flex-1"
          limit={CHOICES_CHAR_LIMIT}
          value={formData.choices?.join("\n") || ""}
          onChange={handleChoicesOnChange}
        />
        <span className="absolute top-4 right-4 text-xs flex flex-row-reverse text-slate-400 font-semibold">
          {" "}
          {currentLength}/{CHOICES_LIMIT}
        </span>
      </fieldset>
      <fieldset className="-mt-4">
        <label></label>

        <div className="error">
          {errors.choices && (
            <span className="text-red-500 text-sm">{errors.choices}</span>
          )}
        </div>
      </fieldset>

      <fieldset>
        <label>Order:</label>
        <div>
          <select
            className="field"
            name="order"
            value={formData.order}
            onChange={handleChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </fieldset>

      <span className="border-t w-full border-slate-100" />

      <button
        className="bg-blue-400 dark:bg-slate-900 shadow text-white rounded py-2 px-4"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default MultiselectForm;
