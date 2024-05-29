"use client";

import TextareaWithLimit from "./TextareaWithLimit";
import "./MultiselectForm.css";
import { CHOICES_CHAR_LIMIT, CHOICES_LIMIT } from "../constants/choices";
import { useMultiselectForm } from "../hooks/useMultiselectForm";
import { Order } from "../models/order";

const MultiselectForm: React.FC = () => {
  const {
    formData,
    errors,
    handleChange,
    handleChoicesOnChange,
    handleSubmit,
    currentChoicesLength,
  } = useMultiselectForm();

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
          {currentChoicesLength}/{CHOICES_LIMIT}
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
            {Object.entries(Order).map(([key, value]) => (
              <option key={key} value={value}>
                {key}
              </option>
            ))}
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
