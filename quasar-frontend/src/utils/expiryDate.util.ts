class ExpiryDate {
  getFutureDate = (
    ctime: string,
    duration: number,
    pack_type: string
  ): Date | string => {
    const currentDate = new Date(ctime);
    console.log(ctime + ' ' + duration + ' ' + pack_type);

    switch (pack_type) {
      case 'week':
        currentDate.setDate(currentDate.getDate() + duration * 7);
        break;
      case 'month':
        const currentDay = currentDate.getDate(); // Save the current day to handle overflow
        currentDate.setMonth(currentDate.getMonth() + duration);

        // Ensure correct month by checking for overflow (month can vary in days)
        if (currentDate.getDate() < currentDay) {
          currentDate.setDate(0); // Set to the last valid date of the previous month
        }
        break;
      case 'year':
        currentDate.setFullYear(currentDate.getFullYear() + duration);
        break;
      default:
        return 'Invalid pack_type! Please use "week", "month", or "year".';
    }
    return currentDate;
  };

  // New function to check if the date is expired within the given duration and pack_type
  isExpired = (ctime: string, duration: number, pack_type: string): boolean => {
    const futureDate = this.getFutureDate(ctime, duration, pack_type);

    if (typeof futureDate === 'string') {
      throw new Error(futureDate); // Handle invalid pack_type error
    }

    const now = new Date();

    // Return true if the current date is after the calculated future date
    return now.getTime() > futureDate.getTime();
  };
}

export default ExpiryDate;
