import { HTMLInputTypeAttribute, forwardRef } from "react";

type InputTextProps = {
  name: string;
  value?: string;
  placeholder?: string
  type?: HTMLInputTypeAttribute
  disabled?: boolean
  id?: string
};

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({...props}: InputTextProps, ref) => {
    return <input ref={ref} {...props}/>;
  }
);