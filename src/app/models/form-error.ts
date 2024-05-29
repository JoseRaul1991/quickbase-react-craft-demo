export type FormError = {
    [key: string]: string;
}

export const reduceToFormError =  (acc: Record<string, string>, err: {path: string, message:string}) => ({
    ...acc,
    [err.path]: err.message,
  })