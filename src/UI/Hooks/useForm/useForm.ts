import { useEffect, useRef } from "react";
import {
  UseFormProperties,
  UseFormRef,
  UseFormRegister,
  UserFormInputs,
} from ".";

const regexForUseForm = {
  numeric: /^[1-9]\d*(\.\d+)?$/,
};

export const useForm = <T extends UseFormProperties>(
  initialState = {} as T
) => {
  const formRef = useRef<{
    [name: string]: UseFormRef<UserFormInputs>;
  }>({});

  const register = <U extends UserFormInputs>(
    prop: keyof T
  ): UseFormRegister<U> => {
    const propName = prop as string;

    (formRef.current![propName] as unknown) = useRef(null);
    return {
      name: propName,
      ref: formRef.current![propName] as UseFormRef<U>,
    };
  };

  const formValue = () => {
    return Object.entries(formRef.current).reduce(
      (prev, [_, { current: input }]) => {
        const valueToSet = input.value;
        const propName = input.name;

        const isNumber = regexForUseForm.numeric.test(input.value);

        return {
          ...prev,
          [propName]: isNumber ? Number(valueToSet) : valueToSet,
        };
      },
      {} as T
    );
  };

  const resetForm = () => {
    Object.entries(formRef.current).forEach(
      ([, { current: ref }]) => (ref.value = initialState[ref.name] || "" as any)
    );
  };

  const setValueForm = (data = {} as Partial<T>) => {
    Object.entries(formRef.current).forEach(([, { current: input }]) => {
      const valueToSet = data[input.name];
      if (valueToSet) input.value = valueToSet as any;
    });
  };

  useEffect(() => {
    setValueForm(initialState);
  }, []);

  return {
    formValue,
    register,
    resetForm,
    setValueForm,
  };
};
