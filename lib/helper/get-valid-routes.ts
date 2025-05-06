import fs from 'fs/promises';
import path from 'path';

export const getValidRoutes = async (): Promise<string[]> => {
  const localePath = path.resolve(process.cwd(), 'app/[locale]');
  const entries = await fs.readdir(localePath, { withFileTypes: true });

  const validRoutes = entries
    .filter(entry =>
      entry.isDirectory() &&
      entry.name !== '[[...all]]' // bỏ dynamic fallback
    )
    .map(entry => `/${entry.name}`);

  // Thêm '/' vào danh sách route hợp lệ
  return ['/', ...validRoutes];
};
