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
  useEffect,
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
// import { CloudflareTurnstileWidget } from '#/lib/cloudflare/turnstile/widget';
// import { useTheme } from 'next-themes';
import { useCurrentLocale } from '#/i18n/client';
import { useBookingSelection } from '#/context/booking/booking-selection-context';
import { useUserStore } from '#/store/user';
import { UserAvatar } from '../ui/user-avatar';
import { useMediaQuery } from 'usehooks-ts';
import { ButtonIcon } from '../ui/button-icon';
import { UploadFile } from '../ui/upload-file';
import { deleteAvatar } from '#/lib/service/delete-avatar';

const dateFormat = 'dd-MM-yyyy';
export interface FormRenderBlockProps {
  fields: FormFieldProps[];
  submitButton?: {
    label?: string;
  };
  containerClassName?: string;
  className?: string;
  buttonClassName?: string;
  isLoginLayout?: boolean;
  onSubmit?: (data: any) => void;
  processing?: boolean;
  // those below type for booking form
  setIsSubmit?: (value: boolean) => void;
  isSubmit?: boolean;
  initialDefaultValues?: Record<string, any>;
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
      processing,
      isSubmit,
      initialDefaultValues,
      buttonClassName,
      onSubmit,
      setIsSubmit,
    },
    ref,
  ) => {
    const isDesktop = useMediaQuery('(min-width: 1024px)');
    const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
    const formRef = useRef<HTMLFormElement | null>(null);
    const { user, setUser } = useUserStore();

    // Lưu trữ originalPreviews riêng biệt từ initialDefaultValues
    const [originalPreviews, setOriginalPreviews] = useState<
      Record<string, string>
    >(() => {
      const original: Record<string, string> = {};
      if (initialDefaultValues) {
        Object.keys(initialDefaultValues).forEach(key => {
          if (
            initialDefaultValues[key] &&
            typeof initialDefaultValues[key] === 'string'
          ) {
            original[key] = initialDefaultValues[key];
          }
        });
      }
      return original;
    });

    const [previewImages, setPreviewImages] = useState<
      Record<string, string[]>
    >(() => {
      const initial: Record<string, string[]> = {};
      if (initialDefaultValues?.avatar) {
        initial['avatar'] = [initialDefaultValues.avatar];
      }
      return initial;
    });

    const [previewFileNames, setPreviewFileNames] = useState<
      Record<string, string[]>
    >({});

    const [uploadFileStates, setUploadFileStates] = useState<
      Record<string, boolean>
    >({});
    const [isDeletingAvatar, setIsDeletingAvatar] = useState<boolean>(false);
    const { formSchema, defaultValues } = useDynamicFormSchema({ fields });
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: initialDefaultValues ?? defaultValues,
    });

    const handleReset = () => {
      if (formRef && formRef.current) {
        formRef.current.reset();
      }
      form.reset({});
      setPreviewImages({});
      setPreviewFileNames({});
    };

    useImperativeHandle(ref, () => ({
      handleReset,
    }));

    useEffect(() => {
      if (isSubmit) {
        form.handleSubmit(data => {
          onSubmit?.(data);
        })();
        setIsSubmit?.(false);
      }
    }, [isSubmit]);

    const handleFilePreview = (files: FileList | null, fieldName: string) => {
      if (!files || files.length === 0) return;

      const fileArray = Array.from(files);
      const fileNames = fileArray.map(file => file.name);
      setPreviewFileNames(prev => ({ ...prev, [fieldName]: fileNames }));

      const imagePreviews = fileArray
        .filter(file => file.type.startsWith('image/'))
        .map(file => URL.createObjectURL(file));
      setPreviewImages(prev => ({
        ...prev,
        [fieldName]: imagePreviews,
      }));
    };

    const handleCustomFileSelect = (
      files: File[] | File | null,
      fieldName: string,
    ) => {
      if (files) {
        const fileArray = Array.isArray(files) ? files : [files];
        form.setValue(fieldName as any, fileArray);
        setPreviewFileNames(prev => ({
          ...prev,
          [fieldName]: fileArray.map(file => file.name),
        }));
        const imagePreviews = fileArray
          .filter(file => file.type.startsWith('image/'))
          .map(file => URL.createObjectURL(file));
        setPreviewImages(prev => ({
          ...prev,
          [fieldName]: imagePreviews,
        }));
      } else {
        form.setValue(fieldName as any, null);
        setPreviewFileNames(prev => ({ ...prev, [fieldName]: [] }));
        // Reset về originalPreview thay vì từ initialDefaultValues
        const originalPreview = originalPreviews[fieldName];
        setPreviewImages(prev => ({
          ...prev,
          [fieldName]: originalPreview ? [originalPreview] : [],
        }));
      }
    };

    // Helper function to remove file preview
    const removeFilePreview = (fieldName: string, fileIndex?: number) => {
      if (fileIndex !== undefined) {
        setPreviewFileNames(prev => ({
          ...prev,
          [fieldName]:
            prev[fieldName]?.filter((_, index) => index !== fileIndex) || [],
        }));
        setPreviewImages(prev => ({
          ...prev,
          [fieldName]:
            prev[fieldName]?.filter((_, index) => index !== fileIndex) || [],
        }));
        const currentFiles = form.getValues(fieldName) as File[] | null;
        if (currentFiles) {
          const updatedFiles = currentFiles.filter(
            (_, index) => index !== fileIndex,
          );
          form.setValue(
            fieldName as any,
            updatedFiles.length > 0 ? updatedFiles : null,
          );
        }
      } else {
        setPreviewImages(prev => ({ ...prev, [fieldName]: [] }));
        setPreviewFileNames(prev => ({ ...prev, [fieldName]: [] }));
        form.setValue(fieldName as any, null);
      }
      const inputEl = fileInputRefs.current[fieldName];
      if (inputEl) {
        inputEl.value = '';
      }
    };

    // Hàm xử lý xóa avatar với API call

    const handleDeleteAvatar = async (fieldName: string) => {
      try {
        setIsDeletingAvatar(true);

        if (isAvatarField(fieldName, 'custom-file') && user?.id) {
          // Check if there's actually a saved avatar to delete on the server
          const hasSavedAvatar = user?.avatarUrl || originalPreviews[fieldName];

          if (hasSavedAvatar) {
            // Call API to delete the saved avatar from server
            const result = await deleteAvatar({ id: user.id });
            if (result?.success) {
              setUser({
                avatar: null,
                avatarUrl: undefined,
                previewAvatar: null,
              });
              setOriginalPreviews(prev => ({ ...prev, [fieldName]: '' }));
              removeFilePreview(fieldName);
            } else {
              console.error('Failed to delete avatar:', result?.message);
            }
          } else {
            // No saved avatar on server, just remove local preview
            // This handles the case where user uploaded new image but didn't save yet
            setUser({
              previewAvatar: null,
            });
            removeFilePreview(fieldName);
          }
        } else {
          // For non-avatar fields, just remove preview
          removeFilePreview(fieldName);
        }
      } catch (error) {
        console.error('Error deleting avatar:', error);
      } finally {
        setIsDeletingAvatar(false);
      }
    };

    // Check if field is avatar type
    const isAvatarField = (fieldName: string, type: string) => {
      return (
        (type === 'file' || type === 'custom-file') &&
        (fieldName === 'avatar' || fieldName.includes('avatar'))
      );
    };

    // Helper to open/close upload modal
    const openUploadModal = (fieldName: string) => {
      setUploadFileStates(prev => ({ ...prev, [fieldName]: true }));
    };

    const closeUploadModal = (fieldName: string) => {
      setUploadFileStates(prev => ({ ...prev, [fieldName]: false }));
    };

    const _rowClassNameErrorMessage = 'absolute left-0 top-full w-full';
    return (
      <Form {...form}>
        <form
          noValidate
          ref={formRef}
          // onSubmit={form.handleSubmit(onSubmit)}
          onSubmit={form.handleSubmit(data => onSubmit?.(data))}
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
                  {type === 'custom-file' && (
                    <FormField
                      control={form.control}
                      name={name}
                      render={({ field }) => {
                        const isAvatar = isAvatarField(name, type);
                        const previewImageArray = previewImages[name] || [];
                        const fileNames = previewFileNames[name] || [];
                        const hasFiles = fileNames.length > 0;
                        const isUploadModalOpen =
                          uploadFileStates[name] || false;
                        const currentPreview = previewImageArray[0];

                        return (
                          <FormItem className="relative flex flex-col items-center gap-y-3 lg:flex-row lg:gap-x-3 lg:gap-y-0">
                            {/* Avatar Display Section */}
                            {isAvatar &&
                              (previewImageArray.length > 0 ? (
                                <div className="relative">
                                  <UserAvatar
                                    urlAvatar={previewImageArray[0]}
                                    width={isDesktop ? 24 : 120}
                                    height={isDesktop ? 24 : 120}
                                    avatarClassName="size-30 lg:size-24"
                                  />
                                  <div className="absolute top-0 right-0">
                                    <ButtonIcon
                                      disabled={processing || isDeletingAvatar}
                                      type="button"
                                      onClick={() => handleDeleteAvatar(name)}
                                      size="sm"
                                      icon={{ name: 'x-mark' }}
                                    />
                                  </div>
                                </div>
                              ) : (
                                <UserAvatar
                                  userName={user?.name
                                    ?.split(' ')
                                    .map(word => word[0].toUpperCase())
                                    .join('')}
                                  avatarClassName="size-30 lg:size-24"
                                  titleFallBack="h3"
                                />
                              ))}

                            {/* Non-avatar file previews */}
                            {!isAvatar && hasFiles && (
                              <div className="mb-3 w-full">
                                {fileNames.map((fileName, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between space-x-2 rounded-md border bg-gray-50 p-2"
                                  >
                                    <span
                                      className="truncate text-sm text-gray-700"
                                      title={fileName}
                                    >
                                      {fileName}
                                    </span>
                                    <ButtonIcon
                                      onClick={() =>
                                        removeFilePreview(name, index)
                                      }
                                      size="sm"
                                      icon={{ name: 'x-mark' }}
                                    />
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Upload Button */}
                            <FormControl>
                              <div className="flex flex-col items-center gap-y-2 lg:items-start lg:gap-y-1.5">
                                <Button
                                  type="button"
                                  onClick={() => openUploadModal(name)}
                                  disabled={processing}
                                  text={
                                    isAvatar
                                      ? previewImageArray.length > 0
                                        ? 'Change Avatar'
                                        : 'Upload Avatar'
                                      : hasFiles
                                        ? 'Change Files'
                                        : 'Upload Files'
                                  }
                                />
                                <Typography className="text-pj-input text-center text-sm">
                                  {isAvatar
                                    ? `JPG, PNG up to 5MB${multiple ? ', multiple files allowed' : ''}`
                                    : `Select ${multiple ? 'files' : 'a file'} to upload`}
                                </Typography>
                              </div>
                            </FormControl>

                            {/* UploadFile Modal */}
                            <UploadFile
                              isOpen={isUploadModalOpen}
                              onClose={() => closeUploadModal(name)}
                              onFileSelect={files => {
                                field.onChange(files);
                                handleCustomFileSelect(files, name);
                                closeUploadModal(name);
                              }}
                              accept={accept}
                              currentPreview={currentPreview} // Sử dụng originalPreview thay vì previewImageArray[0]
                              fieldName={name}
                              isAvatar={isAvatar}
                              multiple={multiple}
                            />

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
                      render={({ field }) => {
                        const isAvatar = isAvatarField(name, type);
                        const previewImage = previewImages[name];
                        const fileNames = previewFileNames[name] || [];
                        const hasFiles = fileNames.length > 0;
                        return (
                          <FormItem className="relative flex flex-col items-center gap-y-3 lg:flex-row lg:gap-x-3 lg:gap-y-0">
                            {isAvatar &&
                              (previewImage ? (
                                <div className="relative">
                                  <UserAvatar
                                    urlAvatar={previewImage[0]}
                                    width={isDesktop ? 24 : 120}
                                    height={isDesktop ? 24 : 120}
                                    avatarClassName="size-30 lg:size-24"
                                  />
                                  <div className="absolute top-0 right-0">
                                    <ButtonIcon
                                      onClick={() => removeFilePreview(name)}
                                      size="sm"
                                      icon={{ name: 'x-mark' }}
                                    />
                                  </div>
                                </div>
                              ) : (
                                <UserAvatar
                                  userName={user?.name
                                    .split(' ')
                                    .map(word => word[0].toUpperCase())
                                    .join('')}
                                  avatarClassName="size-30 lg:size-24"
                                  titleFallBack="h3"
                                />
                              ))}
                            {hasFiles && isAvatar && !previewImage && (
                              <div className="mb-3">
                                <div className="flex items-center space-x-2 rounded-md border bg-gray-50 p-2">
                                  <span
                                    className="truncate text-sm text-gray-700"
                                    title={fileNames[0]}
                                  >
                                    {fileNames[0]}
                                  </span>
                                  <ButtonIcon
                                    onClick={() => removeFilePreview(name)}
                                    size="sm"
                                    icon={{ name: 'x-mark' }}
                                  />
                                </div>
                              </div>
                            )}
                            <FormControl>
                              {/* <Input
                                type="file"
                                disabled={processing}
                                multiple={multiple}
                                accept={accept}
                                placeholder={placeholder ?? label ?? ''}
                                onChange={event =>
                                  field.onChange(event.target.files)
                                }
                              /> */}
                              <Input
                                type="file"
                                disabled={processing}
                                multiple={multiple}
                                ref={el => {
                                  fileInputRefs.current[name] = el;
                                }}
                                // accept={
                                //   accept || (isAvatar ? 'image/*' : undefined)
                                // }
                                accept={accept}
                                placeholder={placeholder ?? label ?? ''}
                                onChange={event => {
                                  const files = event.target.files;
                                  if (files && files.length > 0) {
                                    field.onChange(files);
                                    handleFilePreview(files, name);
                                  }
                                }}
                              />
                            </FormControl>

                            <FormMessage
                              className={cn(_rowClassNameErrorMessage)}
                            />
                          </FormItem>
                        );
                      }}
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
                                    className="flex flex-wrap items-center space-x-2"
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
                          <div className="flex gap-x-8 lg:gap-x-10">
                            {/* <div className="flex"> */}
                            <Typography asChild variant="small-label">
                              <p className="relative bg-white text-black">
                                {placeholder ?? label ?? ''}
                                {item.required && (
                                  <span className="text-pj-red -righ-[10px] absolute top-0">
                                    {' '}
                                    *
                                  </span>
                                )}
                              </p>
                            </Typography>
                            {/* </div> */}
                            <FormItem className="relative">
                              <FormControl>
                                <RadioGroup
                                  defaultValue={field.value}
                                  onValueChange={field.onChange}
                                  className="flex w-full flex-wrap justify-between gap-y-1.5 md:justify-start"
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
                                      <span className="absolute -top-3 left-4 bg-white px-1 text-black">
                                        {placeholder ?? label ?? ''}
                                        {item.required && (
                                          <span className="text-pj-red">
                                            {' '}
                                            *
                                          </span>
                                        )}
                                      </span>
                                    </Typography>
                                    {!field.value && (
                                      <div className="absolute top-1/2 left-3 -translate-y-1/2">
                                        <Typography
                                          asChild
                                          variant="small-label"
                                        >
                                          <span className="text-pj-input">
                                            25/02/2001
                                          </span>
                                        </Typography>
                                      </div>
                                    )}
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
                              className="w-[var(--radix-popover-trigger-width)] p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                // timeZone="UTC"
                                defaultMonth={field.value}
                                selected={field.value}
                                onSelect={field.onChange}
                              />

                              {/* <Calendar
                                mode="single"
                                captionLayout="dropdown"
                                selected={field.value}
                                onSelect={field.onChange}
                                onDayClick={() => setIsOpen(false)}
                                startMonth={
                                  new Date(new Date().getFullYear() - 100, 0)
                                }
                                endMonth={new Date()}
                                defaultMonth={field.value}
                              /> */}
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
            <div className={cn('flex justify-center', buttonClassName)}>
              <Button
                type="submit"
                disabled={processing || isDeletingAvatar}
                variant="big"
                text={submitButton.label}
              />
            </div>
          )}
        </form>
      </Form>
    );
  },
);

FormRenderBlock.displayName = 'FormRenderBlock';
export { FormRenderBlock };
{
  /* {process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY && (
            <CloudflareTurnstileWidget
              siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}
              options={{
                theme:
                  theme !== 'system' ? (theme as 'light' | 'dark') : 'auto',
                language: currentLocale,
              }}
              onSuccess={token => setToken(token)}
            />
          )} */
}
{
  /* {submitButton?.label && (
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
          : null} */
}
