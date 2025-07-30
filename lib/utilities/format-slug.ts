const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // bỏ dấu tiếng Việt
    .replace(/\s+/g, '-') // khoảng trắng → gạch ngang
    .replace(/[^a-z0-9\-]/g, '') // bỏ ký tự đặc biệt
    .replace(/\-\-+/g, '-') // bỏ gạch ngang dư
    .replace(/^-+/, '')
    .replace(/-+$/, '');
export { slugify };
