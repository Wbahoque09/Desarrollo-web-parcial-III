import { HTMLInputTypeAttribute, forwardRef } from "react";

type TextAreaProps = {
  name: string;
  value?: string;
  placeholder?: string
  type?: HTMLInputTypeAttribute
  disabled?: boolean,
  id?: string
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({...props}: TextAreaProps, ref) => {
    return <textarea ref={ref} {...props}/>;
  }
);