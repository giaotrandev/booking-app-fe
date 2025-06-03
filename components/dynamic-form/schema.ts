import { useTranslate } from '#/i18n/client';
import { z } from 'zod';
import { FormFieldProps } from './type';

const defaultMaxFileSize = 4.5; // MB

interface DynamicFormSchemaProps {
  fields?: FormFieldProps[];
}

const maxFileSizeBytes = (fileSize?: number) => {
  const size = fileSize ?? defaultMaxFileSize;
  return size * 1_000_000;
};

const maxFileSizeMegabytes = (fileSize?: number) => {
  return fileSize ?? defaultMaxFileSize;
};

const useDynamicFormSchema = ({ fields }: DynamicFormSchemaProps) => {
  const { translate } = useTranslate();

  const hasFields = Array.isArray(fields) && fields.length > 0;

  let zodRawShape: Record<string, any> = {};
  let defaultValues: Record<string, any> = {};

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

      switch (type) {
        case 'text':
        case 'textarea':
          if (required) {
            zodRawShape[name] = z
              .string()
              .min(1, { message: message.required });
          } else {
            zodRawShape[name] = z.string().optional();
          }
          defaultValues[name] = '';
          break;

        case 'number':
          if (required) {
            zodRawShape[name] = z
              .string()
              .min(1, { message: message.required })
              .refine(val => !isNaN(Number(val)), { message: message.number });
          } else {
            zodRawShape[name] = z
              .string()
              .optional()
              .refine(val => !val || !isNaN(Number(val)), {
                message: message.number,
              });
          }
          defaultValues[name] = '';
          break;

        case 'email':
          if (required) {
            zodRawShape[name] = z
              .string()
              .min(1, { message: message.required })
              .refine(val => emailPattern.test(val), {
                message: message.email,
              });
          } else {
            zodRawShape[name] = z
              .string()
              .optional()
              .refine(val => !val || emailPattern.test(val), {
                message: message.email,
              });
          }
          defaultValues[name] = '';
          break;

        case 'password':
          if (required) {
            zodRawShape[name] = z
              .string({
                required_error: message.required,
              })
              .min(1, { message: message.required })
              .refine(val => val.length >= 7, {
                message: translate({
                  de: 'Das Passwort muss länger als 6 Zeichen sein!',
                  en: 'Password must be longer than 6 characters!',
                }),
              })
              .refine(val => /[A-Z]/.test(val), {
                message: translate({
                  de: 'Das Passwort muss mindestens einen Großbuchstaben enthalten!',
                  en: 'Password must contain at least one uppercase letter!',
                }),
              });
          } else {
            zodRawShape[name] = z
              .string()
              .optional()
              .refine(val => !val || val.length > 6, {
                message: translate({
                  de: 'Das Passwort muss länger als 6 Zeichen sein!',
                  en: 'Password must be longer than 6 characters!',
                }),
              })
              .refine(val => !val || /[A-Z]/.test(val), {
                message: translate({
                  de: 'Das Passwort muss mindestens einen Großbuchstaben enthalten!',
                  en: 'Password must contain at least one uppercase letter!',
                }),
              });
          }
          defaultValues[name] = '';
          break;

        case 'file':
          if (required) {
            zodRawShape[name] = z
              .custom<FileList>()
              .refine(item => item && item.length > 0, {
                message: message.required,
              })
              .refine(
                item => {
                  const files = item ? Array.from(item) : [];
                  return !files.some(
                    file => file.size > maxFileSizeBytes(maxFileSize),
                  );
                },
                { message: message.maxFileSize },
              );
          } else {
            zodRawShape[name] = z
              .custom<FileList>()
              .optional()
              .refine(
                item => {
                  if (!item || item.length === 0) return true;
                  const files = Array.from(item);
                  return !files.some(
                    file => file.size > maxFileSizeBytes(maxFileSize),
                  );
                },
                { message: message.maxFileSize },
              );
          }
          defaultValues[name] = undefined;
          break;

        // case 'checkbox':
        //   if (hasOptions) {
        //     if (required) {
        //       zodRawShape[name] = z
        //         .array(z.string())
        //         .refine(items => Array.isArray(items) && items.length > 0 && items.every(Boolean), {
        //           message: message.required,
        //         });
        //     } else {
        //       zodRawShape[name] = z.array(z.string()).optional();
        //     }
        //     defaultValues[name] = [];
        //   }
        //   break;
        case 'checkbox':
          if (hasOptions) {
            const isSingleCheckbox = options.length === 1;

            if (isSingleCheckbox) {
              // 👇 Checkbox chỉ có 1 lựa chọn → boolean
              zodRawShape[name] = z
                .boolean()
                .refine(val => !required || val === true, {
                  message: message.required,
                });

              defaultValues[name] = false;
            } else {
              // 👇 Checkbox có nhiều lựa chọn → array
              if (required) {
                zodRawShape[name] = z
                  .array(z.string())
                  .refine(
                    items =>
                      Array.isArray(items) &&
                      items.length > 0 &&
                      items.every(Boolean),
                    {
                      message: message.required,
                    },
                  );
              } else {
                zodRawShape[name] = z.array(z.string()).optional();
              }

              defaultValues[name] = [];
            }
          }
          break;
        case 'radio':
          if (hasOptions) {
            if (required) {
              zodRawShape[name] = z
                .string()
                .min(1, { message: message.required });
            } else {
              zodRawShape[name] = z.string().optional();
            }
            defaultValues[name] = '';
          }
          break;

        case 'select':
          if (hasOptions) {
            if (!multiple) {
              if (required) {
                zodRawShape[name] = z
                  .object({
                    value: z.string(),
                    label: z.string(),
                  })
                  .refine(item => Boolean(item?.value && item?.label), {
                    message: message.required,
                  });
              } else {
                zodRawShape[name] = z
                  .object({
                    value: z.string(),
                    label: z.string(),
                  })
                  .optional();
              }
              defaultValues[name] = undefined;
            } else {
              if (required) {
                zodRawShape[name] = z
                  .array(z.object({ value: z.string(), label: z.string() }))
                  .refine(
                    items =>
                      Array.isArray(items) &&
                      items.length > 0 &&
                      items.every(item => item.value && item.label),
                    {
                      message: message.required,
                    },
                  );
              } else {
                zodRawShape[name] = z
                  .array(
                    z.object({
                      value: z.string(),
                      label: z.string(),
                    }),
                  )
                  .optional();
              }
              defaultValues[name] = [];
            }
          }
          break;

        case 'date': {
          const today = new Date();
          const minDate = new Date(
            today.getFullYear() - 100,
            today.getMonth(),
            today.getDate(),
          );
          const maxDate = new Date(
            today.getFullYear() - 18,
            today.getMonth(),
            today.getDate(),
          );

          if (required) {
            zodRawShape[name] = z
              .date({
                required_error: message.required,
                invalid_type_error: 'Invalid date.',
              })
              .refine(date => date <= maxDate, {
                message: 'You must be at least 18 years old.',
              })
              .refine(date => date >= minDate, {
                message: 'You must be younger than 100 years old.',
              });
          } else {
            zodRawShape[name] = z
              .date()
              .optional()
              .refine(date => !date || date <= maxDate, {
                message: 'You must be at least 18 years old.',
              })
              .refine(date => !date || date >= minDate, {
                message: 'You must be younger than 100 years old.',
              });
          }
          defaultValues[name] = undefined;
          break;
        }

        // Có thể bổ sung thêm các loại type khác ở đây nếu cần
      }
    }
  }

  // Refine confirmPassword phải trùng với password nếu có
  const formSchema = z.object(zodRawShape).refine(
    data => {
      if ('confirmPassword' in data && 'password' in data) {
        return data.confirmPassword === data.password;
      }
      return true;
    },
    {
      path: ['confirmPassword'],
      message: translate({
        de: 'Die Passwörter stimmen nicht überein!',
        en: 'Confirm password do not match with password!',
      }),
    },
  );

  return {
    formSchema,
    defaultValues,
  };
};

export { useDynamicFormSchema };
