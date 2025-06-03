export const formatPrice = (value: number | string) => {
  const number = Number(value).toLocaleString('vi-VN');
  return `${number} VND`;
};