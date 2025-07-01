export const formatUtcTime = (isoString: string) => {
  const timePart = isoString.split('T')[1]; // "05:00:00.000Z"
  const [hour, minute] = timePart.split(':');
  return `${parseInt(hour)}:${minute}`;
};
