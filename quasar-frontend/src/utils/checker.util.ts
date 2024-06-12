export const isLessThanThreeDays = (date: string | Date): boolean => {
  const inputDate = typeof date === 'string' ? new Date(date) : date;

  const currentDate = new Date();

  const timeDifference = currentDate.getTime() - inputDate.getTime();

  const dayDifference = timeDifference / (1000 * 3600 * 24);

  return dayDifference < 3;
}
