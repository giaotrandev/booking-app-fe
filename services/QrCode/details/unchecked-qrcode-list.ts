import { convertUncheckedQRCode } from './unchecked-qrcode-item';
import { UncheckedQrCodeItemRequestProps } from './unchecked-qrcode-request';
import { UncheckedQrCodeItemResponseProps } from './unchecked-qrcode-response';

export const convertUncheckedQrcodeList = async (
  list: UncheckedQrCodeItemResponseProps[],
) => {
  const _list: UncheckedQrCodeItemRequestProps[] = [];
  for (const qrcode of list ?? []) {
    if (!qrcode) continue;
    const _qrcode: UncheckedQrCodeItemRequestProps =
      await convertUncheckedQRCode(qrcode);
    _list.push(_qrcode);
  }
  return _list;
};
