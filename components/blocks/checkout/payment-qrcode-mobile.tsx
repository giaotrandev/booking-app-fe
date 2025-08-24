'use client';
import { Modal } from '#/components/headless/modal';
import { Icon } from '#/components/icons';
import { useMediaQuery } from 'usehooks-ts';
import { ItemQrCode, ItemQrCodeProps } from './item-qrcode';
import { useEffect } from 'react';

export interface PaymentQRCodeMobileProps extends ItemQrCodeProps {
  isOpenModal: boolean;
  onClose: () => void;
}

const PaymentQRCodeMobile = ({
  isOpenModal,
  onClose,
  isHaveQrCode,
  totalPrice,
  updatedAt,
  qrCode,
}: PaymentQRCodeMobileProps) => {
  return (
    <Modal
      open={isOpenModal}
      onClose={onClose}
      clickOutsideToClose={true}
      className="fixed inset-0 z-1094"
    >
      <Modal.Backdrop
        className="fixed inset-0 bg-black/50"
        enter={{
          className: 'opacity-50 transition-opacity duration-300',
        }}
        leave={{
          className: 'opacity-0 transition-opacity duration-300',
        }}
      />

      <Modal.Panel
        className="fixed inset-0 flex max-h-dvh w-full items-center justify-center overflow-y-auto px-4"
        enter={{
          className: 'opacity-100 scale-100 transition-all duration-300',
        }}
        leave={{
          className: 'opacity-0 scale-95 transition-all duration-300',
        }}
      >
        {({ isOpened }) => (
          <div className="flex h-full w-full items-center justify-center">
            <div className="relative overflow-y-auto rounded-xl bg-white">
              <ItemQrCode
                qrCode={qrCode ?? ''}
                totalPrice={totalPrice}
                updatedAt={updatedAt}
                isHaveQrCode={isHaveQrCode}
                className="border-0 p-4"
              />
              {isOpened && (
                <button
                  onClick={onClose}
                  className="bg-pj-white absolute top-2 right-3 cursor-pointer"
                >
                  <Icon className="h-6 w-6 stroke-black" name="x-mark" />
                </button>
              )}
            </div>
          </div>
        )}
      </Modal.Panel>
    </Modal>
  );
};

export { PaymentQRCodeMobile };
