export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const mobilePattern = /^09\d{9}$/;

  const sanitizedNumber = phoneNumber.replace(/\D/g, '');

  return mobilePattern.test(sanitizedNumber);
};

export const validateEmailAddress = (email: string): boolean => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
