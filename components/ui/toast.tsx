import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '#/lib/utilities/cn';
import { Icon } from '../icons';
import { Typography } from './typography';

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-6 shadow-lg',
  {
    variants: {
      variant: {
        default: 'bg-white text-black border border-gray-200',
        success: 'bg-green-500 text-white border-green-500',
        error: 'bg-red-500 text-white border-red-500',
        destructive: 'bg-red-600 text-white border-red-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface ToastProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof toastVariants> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    { className, title, description, action, variant, onClose, ...props },
    ref,
  ) => {
    const renderIcon = () => {
      switch (variant) {
        case 'success':
          return <Icon name="check-circle" />;
        case 'error':
          return <Icon name="exclamation-circle" />;
        case 'destructive':
          return <Icon name="x-circle" />;
        default:
          return null;
      }
    };

    return (
      <div
        ref={ref}
        className={cn(toastVariants({ variant }), className)}
        {...props}
      >
        <div className="flex flex-col">
          {title && (
            <Typography
              asChild
              className="flex items-center gap-2 font-semibold"
            >
              <p>
                {renderIcon()}
                {title}
              </p>
            </Typography>
          )}
          {description && (
            <Typography asChild variant="sub-body">
              <p>{description}</p>
            </Typography>
          )}
        </div>
        {action}
        <button
          onClick={onClose}
          className="group/button bg-pj-white hocus-visible:bg-black absolute top-2 right-2 cursor-pointer rounded-full transition-[background-color]"
        >
          <Icon
            className="group-hocus-visible/button:stroke-white h-4 w-4 stroke-white transition-[stroke]"
            name="x-mark"
          />
        </button>
      </div>
    );
  },
);
Toast.displayName = 'Toast';

export { Toast, toastVariants };
