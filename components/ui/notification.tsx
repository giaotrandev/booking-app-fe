import { ReactNode } from 'react';
import { Modal } from '../headless/modal';
import { cn } from '#/lib/utilities/cn';

interface NotificationProps {
  open: boolean;
  onClose: () => void;
  clickOutsideToClose?: boolean;
  children: ReactNode;
  className?: string;
}

const Notification = ({
  open,
  onClose,
  clickOutsideToClose,
  children,
  className,
}: NotificationProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      id="my-modal"
      clickOutsideToClose={clickOutsideToClose}
    >
      <Modal.Backdrop
        className="fixed inset-0 z-[1095] bg-black/50 transition-opacity duration-300"
        enter={{ className: 'opacity-100' }}
        leave={{ className: 'opacity-0' }}
      />
      <Modal.Panel
        className="pointer-events-none fixed inset-0 z-[1096] px-5 transition-opacity duration-300"
        enter={{ className: 'opacity-100' }}
        leave={{ className: 'opacity-0' }}
      >
        {() => (
          <div
            className={cn(
              'pointer-events-auto absolute top-1/2 left-1/2 w-[calc(100%-40px)] -translate-x-1/2 -translate-y-1/2',
              className,
            )}
          >
            {children}
          </div>
        )}
      </Modal.Panel>
    </Modal>
  );
};

export { Notification };
