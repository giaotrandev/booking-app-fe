export const convertToSelectOptions = <T extends { id: string; name?: string }>(
  list: T[],
) =>
  list.map(item => ({
    label: item.name ?? '',
    value: item.id,
  }));
