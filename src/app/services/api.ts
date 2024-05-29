import { MultiselectFormValues, Order } from "../models/MultiselectForm";

export function getMultiselect(id: string): MultiselectFormValues {
  const response = {
    id: id,
    label: 'Favorite color',
    isRequired: false,
    defaultValue: 'red',
    choices: ['red', 'blue', 'green'],
    order: Order.Ascending,
  } as MultiselectFormValues;
  return response;
}

export async function updateMultiselect(field: MultiselectFormValues): Promise<MultiselectFormValues> {
  console.log('Updating field', field);
  return field;
}