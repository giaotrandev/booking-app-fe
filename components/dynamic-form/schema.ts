import { useTranslate } from '#/i18n/client';
import { z } from 'zod';
import { FormFieldProps } from './type';

const defaultMaxFileSize = 4.5;

interface DynamicFormSchemaProps {
  fields?: FormFieldProps[];
}

const maxFileSizeBytes = (fileSize?: number) => {
  const size = fileSize ?? defaultMaxFileSize;
  return size * 1000000;
};

const maxFileSizeMegabytes = (fileSize?: number) => {
  const size = fileSize ?? defaultMaxFileSize;
  return size;
};

const useDynamicFormSchema = ({ fields }: DynamicFormSchemaProps) => {
  const { translate } = useTranslate();

  const hasFields = Array.isArray(fields) && fields.length > 0;

  let zodRawShape = {};
  let defaultValues = {};

  if (hasFields) {
    for (const item of fields) {
      const { name, type, required, options, multiple, maxFileSize } =
        item ?? {};
      const hasOptions = Array.isArray(options) && options.length > 0;

      const message = {
        required: translate({
          de: 'Dieses Feld ist erforderlich!',
          en: 'This field is required!',
        }),
        number: translate({
          de: 'Bitte geben Sie eine gültige Nummer ein!',
          en: 'Please enter a valid number!',
        }),
        email: translate({
          de: 'Bitte gib eine gültige E-Mail Adresse ein!',
          en: 'Please enter a valid email address!',
        }),
        maxFileSize: translate({
          de: `Die Dateigröße sollte weniger als ${maxFileSizeMegabytes(maxFileSize)} MB betragen.`,
          en: `File size should be less than ${maxFileSizeMegabytes(maxFileSize)} MB.`,
        }),
      };

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (type === 'text') {
        if (required) {
          // @ts-ignore
          zodRawShape[name] = z.string().min(1, {
            message: message.required,
          });
        } else {
          // @ts-ignore
          zodRawShape[name] = z.string().optional();
        }
        // @ts-ignore
        defaultValues[name] = '';
      }
      if (type === 'number') {
        if (required) {
          // @ts-ignore
          zodRawShape[name] = z
            .string()
            .min(1, {
              message: message.required,
            })
            .refine(item => !isNaN(Number(item)), {
              message: message.number,
            });
        } else {
          // @ts-ignore
          zodRawShape[name] = z
            .string()
            .optional()
            .refine(item => !isNaN(Number(item)), {
              message: message.number,
            });
        }
        // @ts-ignore
        defaultValues[name] = '';
      }
      if (type === 'email') {
        if (required) {
          // @ts-ignore
          zodRawShape[name] = z
            .string()
            .min(1, {
              message: message.required,
            })
            .refine(item => emailPattern.test(item), {
              message: message.email,
            });
        } else {
          // @ts-ignore
          zodRawShape[name] = z
            .string()
            .refine(item => emailPattern.test(item), {
              message: message.email,
            })
            .optional();
        }
        // @ts-ignore
        defaultValues[name] = '';
      }
      if (type === 'password') {
        if (required) {
          // @ts-ignore
          zodRawShape[name] = z
            .string({
              required_error: translate({
                de: 'Dieses Feld ist erforderlich!',
                en: 'This field is required!',
              }),
            })
            .min(1, {
              message: translate({
                de: 'Dieses Feld ist erforderlich!',
                en: 'This field is required!',
              }),
            }) // Đảm bảo trường không rỗng
            .refine(value => value.length >= 7, {
              message: translate({
                de: 'Das Passwort muss länger als 6 Zeichen sein!',
                en: 'Password must be longer than 6 characters!',
              }),
            })
            .refine(value => /[A-Z]/.test(value), {
              message: translate({
                de: 'Das Passwort muss mindestens einen Großbuchstaben enthalten!',
                en: 'Password must contain at least one uppercase letter!',
              }),
            });
        } else {
          // Trường hợp không bắt buộc
          // @ts-ignore
          zodRawShape[name] = z
            .string()
            .optional()
            .refine(value => !value || value.length > 6, {
              message: translate({
                de: 'Das Passwort muss länger als 6 Zeichen sein!',
                en: 'Password must be longer than 6 characters!',
              }),
            })
            .refine(value => !value || /[A-Z]/.test(value), {
              message: translate({
                de: 'Das Passwort muss mindestens einen Großbuchstaben enthalten!',
                en: 'Password must contain at least one uppercase letter!',
              }),
            });
        }
      
        // @ts-ignore
        defaultValues[name] = '';
      }
      
      if (type === 'file') {
        if (required) {
          // @ts-ignore
          zodRawShape[name] = z
            .custom<FileList>()
            .optional()
            .refine(item => item && item.length > 0, {
              message: message.required,
            })
            .refine(
              item => {
                const items = item && Array.from(item);
                return !(
                  Array.isArray(items) &&
                  items.find(file => file.size > maxFileSizeBytes(maxFileSize))
                );
              },
              {
                message: message.maxFileSize,
              },
            );
        } else {
          // @ts-ignore
          zodRawShape[name] = z
            .custom<FileList>()
            .optional()
            .refine(
              item => {
                const items = item && Array.from(item);
                return (
                  !item ||
                  !(item.length > 0) ||
                  !(
                    Array.isArray(items) &&
                    items.find(
                      file => file.size > maxFileSizeBytes(maxFileSize),
                    )
                  )
                );
              },
              {
                message: message.maxFileSize,
              },
            );
        }
        // @ts-ignore
        defaultValues[name] = undefined;
      }
      if (type === 'textarea') {
        if (required) {
          // @ts-ignore
          zodRawShape[name] = z.string().min(1, {
            message: message.required,
          });
        } else {
          // @ts-ignore
          zodRawShape[name] = z.string().optional();
        }
        // @ts-ignore
        defaultValues[name] = '';
      }
      if (type === 'checkbox' && hasOptions) {
        if (required) {
          // @ts-ignore
          zodRawShape[name] = z
            .array(z.string())
            .optional()
            .refine(
              items => {
                if (Array.isArray(items) && items.length > 0) {
                  const filterItems = items.filter(item =>
                    item ? item : undefined,
                  );
                  return Array.isArray(filterItems) && filterItems.length > 0;
                } else {
                  return false;
                }
              },
              {
                message: message.required,
              },
            );
        } else {
          // @ts-ignore
          zodRawShape[name] = z.array(z.string()).optional();
        }
        // @ts-ignore
        defaultValues[name] = [];
      }
      if (type === 'radio' && hasOptions) {
        if (required) {
          // @ts-ignore
          zodRawShape[name] = z.string().min(1, {
            message: message.required,
          });
        } else {
          // @ts-ignore
          zodRawShape[name] = z.string().optional();
        }
        // @ts-ignore
        defaultValues[name] = '';
      }
      if (type === 'select' && hasOptions) {
        if (!multiple) {
          if (required) {
            // @ts-ignore
            zodRawShape[name] = z
              .object({
                value: z.string(),
                label: z.string(),
              })
              .optional()
              .refine(item => (item?.value && item?.label ? true : false), {
                message: message.required,
              });
          } else {
            // @ts-ignore
            zodRawShape[name] = z
              .object({
                value: z.string(),
                label: z.string(),
              })
              .optional();
          }
          // @ts-ignore
          defaultValues[name] = undefined;
        } else {
          if (required) {
            // @ts-ignore
            zodRawShape[name] = z
              .array(
                z.object({
                  value: z.string(),
                  label: z.string(),
                }),
              )
              .optional()
              .refine(
                items => {
                  if (Array.isArray(items) && items.length > 0) {
                    const filterItems = items.filter(item =>
                      item.value && item.label ? item : undefined,
                    );
                    return Array.isArray(filterItems) && filterItems.length > 0;
                  } else {
                    return false;
                  }
                },
                {
                  message: message.required,
                },
              );
          } else {
            // @ts-ignore
            zodRawShape[name] = z
              .array(
                z.object({
                  value: z.string(),
                  label: z.string(),
                }),
              )
              .optional();
          }
          // @ts-ignore
          defaultValues[name] = [];
        }
      }
      if (type === 'date') {
        if (required) {
          // @ts-ignore
          zodRawShape[name] = z
            .date()
            .optional()
            .refine(item => (item ? true : false), {
              message: message.required,
            });
        } else {
          // @ts-ignore
          zodRawShape[name] = z.date().optional();
        }
        // @ts-ignore
        defaultValues[name] = undefined;
      }
      // SETUP - Dynamic form: Add other schema here
    }
  }

  return {
    formSchema: z.object(zodRawShape),
    defaultValues,
  };
};

export { useDynamicFormSchema };
