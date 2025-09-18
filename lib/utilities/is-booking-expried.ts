function isBookingExpired(updatedAt: string, limitMinutes: number) {
  const updatedAtDate = new Date(updatedAt);
  const now = new Date();
  const diffMs = now.getTime() - updatedAtDate.getTime();
  const diffMinutes = diffMs / (1000 * 60);

  return diffMinutes > limitMinutes;
}
export { isBookingExpired };
