import { ReactNode } from 'react';
import { Modal } from '../headless/modal';

interface NotificationProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Notification = ({ open, onClose, children }: NotificationProps) => {
  return (
    <Modal open={open} onClose={onClose} id="my-modal">
      <Modal.Backdrop
        className="fixed inset-0 z-[1095] bg-black/50 transition-opacity duration-300"
        enter={{ className: 'opacity-100' }}
        leave={{ className: 'opacity-0' }}
      />

      <Modal.Panel
        className="fixed inset-0 z-[1095] flex items-center justify-center px-5 transition-[opacity,transform]"
        enter={{ className: 'opacity-100 translate-y-0' }}
        leave={{ className: 'opacity-0 translate-y-4' }}
      >
        {() => <>{children}</>}
      </Modal.Panel>
    </Modal>
  );
};

export { Notification };
