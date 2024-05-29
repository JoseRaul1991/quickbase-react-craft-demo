import { object, string, boolean, array, InferType } from "yup";
import { CHOICES_CHAR_LIMIT, CHOICES_LIMIT } from "../constants/choices";

export enum Order {
    Ascending = "asc",
    Descending = "desc",
}

export const filterFnEmptyChoices = (choice: string) => choice.trim() !== "";

export const validationSchema = object().shape({
    id: string(),
    label: string().required(),
    isRequired: boolean(),
    defaultValue: string().test("defaultValue", "Default value is not included in choices and the list already reached the limit", (defaultValue, context) => {
        const { choices } = context.parent;
        return choices?.includes(defaultValue) || (choices || []).length < CHOICES_LIMIT;
    }),
    choices: array().of(string().required())
        .test("choices", `choices must be less than or equal to ${CHOICES_LIMIT}`, (choices) => {
            return (choices || [])?.filter(filterFnEmptyChoices).length <= CHOICES_LIMIT;
        })
        .test("choices", `Choices have a character limit of ${CHOICES_CHAR_LIMIT}`, (choices) => {
            return !choices?.filter(filterFnEmptyChoices).some((choice) => choice.trim().length > CHOICES_CHAR_LIMIT);
        })
        .test("choices", "Choices must be unique", (choices) => { 
            const nonEmptyChoices = choices?.filter(filterFnEmptyChoices);
            return new Set(nonEmptyChoices).size === nonEmptyChoices?.length;
        }),
    order: string().oneOf([...Object.values(Order)]),
});

export type MultiselectFormValues = InferType<typeof validationSchema>;

export const INITIAL_VALUES: MultiselectFormValues = {
    id: "",
    label: "",
    isRequired: false,
    defaultValue: "",
    choices: [],
    order: Order.Ascending,
  };