import { useState, ChangeEvent, FormEvent } from "react";

type FormValues = { [key: string]: any };
type Errors = { [key: string]: string };

interface UseFormProps<T extends FormValues> {
  initialValues: T;
  validate?: (values: T) => Errors;
  onSubmit: (values: T) => void;
}

export function useForm<T extends FormValues>({
  initialValues,
  validate,
  onSubmit,
}: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;


    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate ? validate(values) : {};
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
}
