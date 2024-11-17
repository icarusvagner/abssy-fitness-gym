interface PaymentAttributes {
  amount: number;
  paid_at: number; // Timestamp in seconds
  updated_at: number; // Timestamp in seconds
}

interface Payment {
  attributes: PaymentAttributes;
}

export interface GroupedPayment {
  month: string; // Month name, e.g., "January 2024"
  totalAmount: string; // Total amount formatted as a string with decimal points
}

export const processPayments = (
  payments: Payment[],
  filterMonth?: string // '01' for January, '02' for February, etc.
): GroupedPayment[] => {
  const results = Object.values(
    payments
      // Step 1: Extract relevant data
      .map((payment) => {
        const { amount, paid_at } = payment.attributes;
        const paidDate = new Date(paid_at * 1000); // Convert to milliseconds
        return {
          amount,
          paidMonth: (paidDate.getMonth() + 1).toString().padStart(2, '0'), // Get month number (e.g., '01' for January)
          paidYear: paidDate.getFullYear(), // Get year
          paidMonthName: paidDate.toLocaleString('en-US', { month: 'long' }), // Full month name (e.g., "January")
        };
      })
      // Step 2: Apply filters for the month
      .filter(({ paidMonth }) => {
        // Only include payments that match the filtered month if provided
        return filterMonth ? paidMonth === filterMonth : true;
      })
      // Step 3: Group amounts by month
      .reduce(
        (
          acc: Record<string, { month: string; totalAmount: number }>,
          { amount, paidMonthName, paidYear }
        ) => {
          const key = `${paidMonthName} ${paidYear}`; // e.g., "January 2024"
          if (!acc[key]) {
            acc[key] = { month: key, totalAmount: 0 };
          }
          acc[key].totalAmount += amount;
          return acc;
        },
        {}
      )
  )
    // Step 4: Convert grouped totals to desired format
    .map(({ month, totalAmount }) => ({
      month,
      totalAmount: (totalAmount / 100).toFixed(2), // Divide by 100 and format as a string with two decimals
    }))
    // Step 5: Sort by year and month
    .sort((a, b) => {
      const [aMonthName, aYear] = a.month.split(' ');
      const [bMonthName, bYear] = b.month.split(' ');

      const aDate = new Date(`${aMonthName} 1, ${aYear}`).getTime();
      const bDate = new Date(`${bMonthName} 1, ${bYear}`).getTime();

      return aDate - bDate;
    });

  return results;
};
