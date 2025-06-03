// import fs from 'fs/promises';
// import path from 'path';

// export const getValidRoutes = async (): Promise<string[]> => {
//   const localePath = path.resolve(process.cwd(), 'app/[locale]');
//   const entries = await fs.readdir(localePath, { withFileTypes: true });

//   const validRoutes = entries
//     .filter(entry =>
//       entry.isDirectory() &&
//       entry.name !== '[[...all]]' // bỏ dynamic fallback
//     )
//     .map(entry => `/${entry.name}`);

//   // Thêm '/' vào danh sách route hợp lệ
//   return ['/', ...validRoutes];
// };

import fs from 'fs/promises';
import path from 'path';
import { routing } from '#/i18n/routing'; // lấy từ config next-intl

export const getValidRoutes = async (): Promise<string[]> => {
  const validRoutes = new Set<string>();

  for (const locale of routing.locales) {
    const localePath = path.resolve(process.cwd(), `app/${locale}`);
    const exists = await fs.stat(localePath).then(() => true).catch(() => false);
    if (!exists) continue;

    const entries = await fs.readdir(localePath, { withFileTypes: true });

    for (const entry of entries) {
      if (
        entry.isDirectory() &&
        entry.name !== '[[...all]]' && // bỏ dynamic fallback
        entry.name !== '(components)' && // nếu bạn có thư mục như (components)
        entry.name !== '(...)' // các group folders khác
      ) {
        validRoutes.add(`/${entry.name}`);
      }
    }
  }

  validRoutes.add('/'); // Thêm trang chủ
  return Array.from(validRoutes);
};
