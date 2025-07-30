export interface FormFieldOptionProps {
  value: string | boolean;
  label: string;
  id: string;
}

export interface FormFieldProps {
  id?: string;
  name: string;
  type?:
    | 'text'
    | 'number'
    | 'password'
    | 'email'
    | 'file'
    | 'textarea'
    | 'checkbox'
    | 'radio'
    | 'select'
    | 'date';
  label?: string;
  placeholder?: string;
  required?: boolean;
  options?: FormFieldOptionProps[];
  multiple?: boolean;
  accept?: string;
  maxFileSize?: number;
  width?: number;
}
