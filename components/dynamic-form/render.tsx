'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { useDynamicFormSchema } from './schema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { FormFieldOptionProps, FormFieldProps } from './type';
import { Input, inputVariants } from '../ui/input';
import {
  CSSProperties,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from '../headless/popover';
import { cn } from '#/lib/utilities/cn';
import { Select } from '../ui/select';
import { Calendar } from '../ui/calendar';
import { Typography, typographyVariants } from '../ui/typography';
import { Button } from '../ui/button';
import { Icon } from '../icons';
const dateFormat = 'dd-MM-yyyy';
export interface FormRenderBlockProps {
  fields: FormFieldProps[];
  submitButton?: {
    label?: string;
  };
  containerClassName?: string;
  className?: string;
  isLoginLayout?: boolean;
  onSubmit: (data: any) => void;
  processing?: boolean;
}
const FormRenderBlock = forwardRef<
  { handleReset: () => void },
  FormRenderBlockProps
>(
  (
    {
      fields,
      containerClassName,
      className,
      isLoginLayout,
      submitButton,
      onSubmit,
      processing,
    },
    ref,
  ) => {
    const formRef = useRef<HTMLFormElement | null>(null);

    const { formSchema, defaultValues } = useDynamicFormSchema({ fields });
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues,
    });
    const handleReset = () => {
      if (formRef && formRef.current) {
        formRef.current.reset();
      }
      form.reset({});
    };

    useImperativeHandle(ref, () => ({
      handleReset,
    }));

    const _rowClassNameErrorMessage = 'absolute left-0 top-full w-full';
    return (
      <Form {...form}>
        <form
          noValidate
          ref={formRef}
          // onSubmit={form.handleSubmit(onSubmit)}
          onSubmit={form.handleSubmit(data => onSubmit(data))}
          className="space-y-6 lg:space-y-10"
        >
          <div className={cn('flex flex-wrap', containerClassName)}>
            {fields.map((item, key) => {
              const {
                name,
                type,
                label,
                placeholder,
                options,
                multiple,
                accept,
                width,
              } = item ?? {};
              return (
                <div
                  className={cn(
                    'w-full shrink-0 grow-0 basis-full lg:w-[var(--vs-form-field-width)] lg:basis-[var(--vs-form-field-width)]',
                    className,
                  )}
                  style={
                    {
                      '--vs-form-field-width': `${width ?? 100}%`,
                    } as CSSProperties
                  }
                  key={key}
                >
                  {type === 'text' && (
                    <FormField
                      control={form.control}
                      // @ts-ignore
                      name={name}
                      render={({ field }) => (
                        <FormItem className="relative">
                          <FormControl>
                            <Input
                              {...field}
                              disabled={processing}
                              required={item.required}
                              placeholder={placeholder ?? label ?? ''}
                            />
                          </FormControl>
                          <FormMessage
                            className={cn(_rowClassNameErrorMessage)}
                          />
                        </FormItem>
                      )}
                    />
                  )}
                  {type === 'password' && (
                    <FormField
                      control={form.control}
                      // @ts-ignore
                      name={name}
                      render={({ field }) => {
                        const [showPassword, setShowPassword] = useState(false);

                        return (
                          <FormItem className="relative">
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type={showPassword ? 'text' : 'password'}
                                  disabled={processing}
                                  required={item.required}
                                  placeholder={placeholder ?? label ?? ''}
                                />
                                <span
                                  onClick={() => setShowPassword(!showPassword)}
                                  className={cn(
                                    'absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700',
                                    processing &&
                                      'pointer-events-none opacity-50',
                                  )}
                                >
                                  {showPassword ? (
                                    <Icon name="hide-password" />
                                  ) : (
                                    <Icon name="eye" />
                                  )}
                                </span>
                              </div>
                            </FormControl>
                            <FormMessage
                              className={cn(_rowClassNameErrorMessage)}
                            />
                          </FormItem>
                        );
                      }}
                    />
                  )}
                  {type === 'number' && (
                    <FormField
                      control={form.control}
                      // @ts-ignore
                      name={name}
                      render={({ field }) => (
                        <FormItem className="relative">
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              disabled={processing}
                              required={item.required}
                              placeholder={placeholder ?? label ?? ''}
                            />
                          </FormControl>
                          <FormMessage
                            className={cn(_rowClassNameErrorMessage)}
                          />
                        </FormItem>
                      )}
                    />
                  )}
                  {type === 'email' && (
                    <FormField
                      control={form.control}
                      // @ts-ignore
                      name={name}
                      render={({ field }) => {
                        return (
                          <FormItem className="relative">
                            <FormControl>
                              <Input
                                {...field}
                                disabled={processing}
                                required={item.required}
                                placeholder={placeholder ?? label ?? ''}
                              />
                            </FormControl>
                            {isLoginLayout && (
                              <div className="absolute top-full right-0">
                                <Typography
                                  asChild
                                  variant="sub-label"
                                  className="mt-1 ml-4.5"
                                >
                                  <p>Ex. user123@abc.com</p>
                                </Typography>
                              </div>
                            )}
                            <FormMessage
                              className={cn(_rowClassNameErrorMessage)}
                            />
                          </FormItem>
                        );
                      }}
                    />
                  )}
                  {type === 'file' && (
                    <FormField
                      control={form.control}
                      // @ts-ignore
                      name={name}
                      render={({ field }) => (
                        <FormItem className="relative">
                          <FormControl>
                            <Input
                              type="file"
                              disabled={processing}
                              multiple={multiple}
                              accept={accept}
                              placeholder={placeholder ?? label ?? ''}
                              onChange={event =>
                                field.onChange(event.target.files)
                              }
                            />
                          </FormControl>
                          <FormMessage
                            className={cn(_rowClassNameErrorMessage)}
                          />
                        </FormItem>
                      )}
                    />
                  )}
                  {type === 'textarea' && (
                    <FormField
                      control={form.control}
                      // @ts-ignore
                      name={name}
                      render={({ field }) => (
                        <FormItem className="relative">
                          <FormControl>
                            <Textarea
                              {...field}
                              disabled={processing}
                              placeholder={placeholder ?? label ?? ''}
                            />
                          </FormControl>
                          <FormMessage
                            className={cn(_rowClassNameErrorMessage)}
                          />
                        </FormItem>
                      )}
                    />
                  )}
                  {/* {type === 'checkbox' &&
                    Array.isArray(options) &&
                    options.length > 0 && (
                      <FormField
                        control={form.control}
                        // @ts-ignore
                        name={name}
                        render={() => (
                          <FormItem className="relative">
                            {options.map((option, key) => (
                              <FormField
                                key={key}
                                control={form.control}
                                // @ts-ignore
                                name={name}
                                render={({ field }) => {
                                  const optionValue = JSON.stringify(
                                    option,
                                    Object.keys(option).sort(),
                                  );
                                  return (
                                    <FormItem className="flex items-center space-x-2">
                                      <FormControl>
                                        <Checkbox
                                          disabled={processing}
                                          // @ts-ignore
                                          checked={field.value?.includes(
                                            optionValue,
                                          )}
                                          onCheckedChange={checked => {
                                            field.onChange(
                                              checked
                                                ? [
                                                    ...(Array.isArray(
                                                      field.value,
                                                    ) &&
                                                    // @ts-ignore
                                                    field.value.length > 0
                                                      ? field.value
                                                      : []),
                                                    optionValue,
                                                  ] // @ts-ignore
                                                : field.value?.filter(
                                                    // @ts-ignore
                                                    value =>
                                                      value !== optionValue,
                                                  ),
                                            );
                                          }}
                                          aria-label={option.label}
                                        />
                                      </FormControl>
                                      <FormLabel
                                        className={cn(
                                          typographyVariants({
                                            variant: 'small-label',
                                          }),
                                          'text-pj-grey-light cursor-pointer',
                                          processing &&
                                            'pointer-events-none opacity-50',
                                        )}
                                      >
                                        {option.label}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                            <FormMessage
                              className={cn(_rowClassNameErrorMessage)}
                            />
                          </FormItem>
                        )}
                      />
                    )} */}
                  {type === 'checkbox' &&
                    Array.isArray(options) &&
                    options.length > 0 && (
                      <FormField
                        control={form.control}
                        name={name}
                        render={({ field }) => {
                          const isSingleCheckbox = options.length === 1;

                          return (
                            <FormItem className="relative">
                              {options.map((option, key) => {
                                const isChecked = isSingleCheckbox
                                  ? (field.value ?? false)
                                  : Array.isArray(field.value) &&
                                    field.value.includes(option.value);

                                const handleChange = (checked: boolean) => {
                                  if (isSingleCheckbox) {
                                    field.onChange(checked);
                                  } else {
                                    const current = Array.isArray(field.value)
                                      ? field.value
                                      : [];

                                    field.onChange(
                                      checked
                                        ? [...current, option.value]
                                        : current.filter(
                                            v => v !== option.value,
                                          ),
                                    );
                                  }
                                };

                                return (
                                  <FormItem
                                    key={key}
                                    className="flex items-center space-x-2"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        disabled={processing}
                                        checked={isChecked}
                                        onCheckedChange={handleChange}
                                        aria-label={option.label}
                                      />
                                    </FormControl>
                                    <FormLabel
                                      className={cn(
                                        typographyVariants({
                                          variant: 'small-label',
                                        }),
                                        'text-pj-grey-light cursor-pointer',
                                        processing &&
                                          'pointer-events-none opacity-50',
                                      )}
                                    >
                                      {option.label}
                                    </FormLabel>
                                  </FormItem>
                                );
                              })}
                              <FormMessage
                                className={cn(_rowClassNameErrorMessage)}
                              />
                            </FormItem>
                          );
                        }}
                      />
                    )}

                  {type === 'radio' &&
                    Array.isArray(options) &&
                    options.length > 0 && (
                      <FormField
                        control={form.control}
                        // @ts-ignore
                        name={name}
                        render={({ field }) => (
                          <div className="ml-5 flex gap-x-10">
                            <div>
                              <Typography asChild variant="small-label">
                                <span className="text-pj-black bg-white">
                                  {placeholder ?? label ?? ''}
                                  {item.required && (
                                    <span className="text-pj-red"> *</span>
                                  )}
                                </span>
                              </Typography>
                            </div>
                            <FormItem className="relative">
                              <FormControl>
                                <RadioGroup
                                  defaultValue={field.value}
                                  onValueChange={field.onChange}
                                  className="flex flex-wrap"
                                >
                                  {options.map(
                                    (option: FormFieldOptionProps, key) => {
                                      // const optionValue = JSON.stringify(
                                      //   option,
                                      //   Object.keys(option).sort(),
                                      // );
                                      // const optionValue = option.value;
                                      const optionValue = String(option.value);
                                      return (
                                        <FormItem
                                          key={key}
                                          className="flex items-center gap-x-3"
                                        >
                                          <FormControl>
                                            <RadioGroupItem
                                              disabled={processing}
                                              value={optionValue}
                                              // checked={field.value === optionValue}
                                              checked={
                                                String(field.value) ===
                                                optionValue
                                              }
                                              aria-label={option.label}
                                            />
                                          </FormControl>
                                          <FormLabel
                                            className={cn(
                                              processing &&
                                                'pointer-events-none opacity-50',
                                            )}
                                          >
                                            {option.label}
                                          </FormLabel>
                                        </FormItem>
                                      );
                                    },
                                  )}
                                </RadioGroup>
                              </FormControl>
                              <FormMessage
                                className={cn(_rowClassNameErrorMessage)}
                              />
                            </FormItem>
                          </div>
                        )}
                      />
                    )}
                  {type === 'select' &&
                    Array.isArray(options) &&
                    options.length > 0 && (
                      <FormField
                        control={form.control}
                        // @ts-ignore
                        name={name}
                        render={({ field }) => (
                          <FormItem className="relative">
                            <FormControl>
                              <Select
                                disabled={processing}
                                // options={options}
                                options={options.map(opt => ({
                                  ...opt,
                                  value: String(opt.value),
                                }))}
                                multiple={multiple}
                                // searchable // SETUP - Dynamic form: Enable this prop if your select has search input
                                placeholder={placeholder ?? label ?? ''}
                                value={field.value}
                                onChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage
                              className={cn(_rowClassNameErrorMessage)}
                            />
                          </FormItem>
                        )}
                      />
                    )}
                  {type === 'date' && (
                    <FormField
                      control={form.control}
                      // @ts-ignore
                      name={name}
                      render={({ field, fieldState }) => (
                        <FormItem className="relative flex w-full flex-col">
                          <Popover open={isOpen} onOpenChange={setIsOpen}>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <button
                                  type="button"
                                  disabled={processing}
                                  className={cn(
                                    inputVariants(),
                                    'relative cursor-pointer',
                                    'data-[state=open]:border-vs-input-focus',
                                    !!fieldState.error && 'border-pj-red!',
                                  )}
                                >
                                  <>
                                    {field.value && (
                                      <div className="flex items-center">
                                        {format(field.value, dateFormat)}
                                      </div>
                                    )}
                                    <Typography asChild variant="small-label">
                                      <span className="text-pj-black absolute -top-3 left-4 bg-white px-1">
                                        {placeholder ?? label ?? ''}
                                        {item.required && (
                                          <span className="text-pj-red">
                                            {' '}
                                            *
                                          </span>
                                        )}
                                      </span>
                                    </Typography>
                                    <div className="absolute top-1/2 right-0 -translate-1/2">
                                      <Icon
                                        name="date"
                                        className="fill-pj-grey-light h-5 w-5"
                                      />
                                    </div>
                                  </>
                                </button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                captionLayout="dropdown"
                                selected={field.value}
                                // onSelect={selectedDate => {
                                //   const [hours, minutes] = time.split(':')!;
                                //   selectedDate?.setHours(
                                //     parseInt(hours),
                                //     parseInt(minutes),
                                //   );
                                //   setDate(selectedDate!);
                                //   field.onChange(selectedDate);
                                // }}

                                onSelect={field.onChange}
                                onDayClick={() => setIsOpen(false)}
                                startMonth={
                                  new Date(new Date().getFullYear() - 100, 0)
                                }
                                endMonth={new Date()}
                                // disabled={date =>
                                //   Number(date) <
                                //     Date.now() - 1000 * 60 * 60 * 24 ||
                                //   Number(date) >
                                //     Date.now() + 1000 * 60 * 60 * 24 * 30
                                // }
                                defaultMonth={field.value}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage
                            className={cn(_rowClassNameErrorMessage)}
                          />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
          {submitButton?.label && (
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={processing}
                variant="big"
                text={submitButton.label}
              />
            </div>
          )}
          {/* {process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY && (
          <CloudflareTurnstileWidget
            siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}
            options={{
              theme: theme !== 'system' ? (theme as 'light' | 'dark') : 'auto',
              language: currentLocale,
            }}
            onSuccess={token => setToken(token)}
          />
        )} */}
          {/* {submitButton?.label && (
          <div>
            <Button type="submit" disabled={processing}>
              {submitButton.label}
            </Button>
          </div>
        )}
        {success !== undefined
          ? success
            ? response?.success
            : response?.error
          : null} */}
        </form>
      </Form>
    );
  },
);

FormRenderBlock.displayName = 'FormRenderBlock';
export { FormRenderBlock };
