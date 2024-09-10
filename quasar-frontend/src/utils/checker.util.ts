export const isLessThanThreeDays = (date: string | Date): boolean => {
  const inputDate = typeof date === 'string' ? new Date(date) : date;

  const currentDate = new Date();

  const timeDifference = currentDate.getTime() - inputDate.getTime();

  const dayDifference = timeDifference / (1000 * 3600 * 24);

  return dayDifference < 3;
};

export const isLessThanAWeek = (date: string | Date): boolean => {
  const inputDate = typeof date === 'string' ? new Date(date) : date;

  const currentDate = new Date();

  const timeDifference = currentDate.getTime() - inputDate.getTime();

  const dayDifference = timeDifference / (1000 * 3600 * 24);

  return dayDifference < 7;
};

export const checkTimeExpr = (timestamp: number, minutes: number): boolean => {
  const timeLimitInMs = minutes * 60 * 1000; // Convert minutes to milliseconds
  const currentTime = Date.now(); // Get current time in milliseconds

  return timestamp > currentTime - timeLimitInMs;
};
