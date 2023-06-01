export type UserFormInputs = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export type UseFormRef<T extends Forms> = React.MutableRefObject<T>;

export interface UseFormProperties {
  [prop: string]: string | number | bigint | null | undefined;
};

export interface UseFormRegister<T extends Forms> {
  name: string;
  ref: UseFormRef<T>;
  value?: string;
  onChange?: React.ChangeEventHandler<T>;
};
