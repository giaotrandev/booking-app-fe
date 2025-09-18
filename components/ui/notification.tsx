import { ReactNode, useRef } from 'react';
import { Modal } from '../headless/modal';
import { cn } from '#/lib/utilities/cn';
import { useOnClickOutside } from 'usehooks-ts';

interface NotificationProps {
  open: boolean;
  onClose: () => void;
  clickOutsideToClose?: boolean;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  containerClassName?: string;
}

const Notification = ({
  open,
  onClose,
  clickOutsideToClose = true,
  children,
  className,
  contentClassName,
  containerClassName,
}: NotificationProps) => {
  // const ref = useRef<HTMLDivElement | null>(null);

  // Apply useOnClickOutside to the content div
  // @ts-ignore
  // useOnClickOutside(ref, clickOutsideToClose ? onClose : () => {});

  return (
    <>
      <Modal
        open={open}
        clickOutsideToClose={clickOutsideToClose}
        onClose={onClose}
        className={cn('relative z-2000', containerClassName)}
      >
        <Modal.Backdrop
          className="fixed inset-0 bg-black/30 transition-opacity duration-300"
          enter={{
            className: `opacity-100 ease-in-out`,
          }}
          leave={{
            className: `opacity-0 ease-in-out`,
          }}
        />
        <div className="fixed inset-0 overflow-x-hidden overflow-y-auto">
          <div className="flex min-h-full flex-col items-center justify-center">
            <Modal.Panel
              className={cn(
                'mx-auto flex w-full justify-center transition-opacity duration-300',
                className,
              )}
              enter={{
                className: `opacity-100 ease-in-out`,
              }}
              leave={{
                className: `opacity-0 ease-in-out`,
              }}
            >
              {({ isOpened }) => (
                <div
                  className={cn('w-full', contentClassName)}
                  onClick={e => e.stopPropagation()}
                >
                  {children}
                </div>
              )}
            </Modal.Panel>
          </div>
        </div>
      </Modal>
      {/* <Modal
        open={open}
        onClose={onClose}
        id="my-modal"
        clickOutsideToClose={clickOutsideToClose}
        className={modalClassName}
      >
        <Modal.Backdrop
          className="fixed inset-0 z-[1095] bg-black/50 transition-opacity"
          enter={{ className: 'opacity-100' }}
          leave={{ className: 'opacity-0' }}
        />
        <Modal.Panel
          className={cn(
            'fixed inset-0 z-[1096] max-h-screen overflow-y-auto transition-opacity',
            modalClassName,
          )}
          enter={{ className: 'opacity-100' }}
          leave={{ className: 'opacity-0' }}
        >
          {() => (
            <div
              ref={ref}
              className={cn(
                'pointer-events-auto absolute top-1/2 left-1/2 mx-5 w-full -translate-x-1/2 -translate-y-1/2',
                className,
              )}
            >
              {children}
            </div>
          )}
        </Modal.Panel>
      </Modal> */}
    </>
  );
};

export { Notification };
