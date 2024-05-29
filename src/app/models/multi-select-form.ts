import { InferType } from "yup";
import { validationSchema } from "./multi-select-form-schema";
import { Order } from "./order";

export type MultiselectFormValues = InferType<typeof validationSchema>;

export const INITIAL_VALUES: MultiselectFormValues = {
    id: "",
    label: "",
    isRequired: false,
    defaultValue: "",
    choices: [],
    order: Order.Ascending,
  };

  export const includeDefaultValueInChoices = (formData: MultiselectFormValues) => ({
    ...formData,
    choices: Array.from(
      new Set(
        [...(formData.choices ?? []), formData.defaultValue ?? ""]?.map(
          (choice) => choice.trim()
        )
      )
    ),
  });