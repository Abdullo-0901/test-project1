import { useState, ChangeEvent, FormEvent } from "react";

type FormValues = { [key: string]: any };
type Errors = { [key: string]: string };

interface UseFormProps<T extends FormValues> {
  initialValues: T;
}

export function useForm<T extends FormValues>({
  initialValues,
}: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  }

  return {
    values,
    handleChange,
  };
}
