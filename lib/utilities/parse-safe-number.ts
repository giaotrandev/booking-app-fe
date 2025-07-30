const parseSafeNumber = (value: unknown): number | undefined => {
  const num = Number(value); // ép kiểu sang number, có thể ra NaN nếu value không hợp lệ
  return isFinite(num) ? num : undefined; // chỉ trả về num nếu là số hữu hạn
};
export { parseSafeNumber };
