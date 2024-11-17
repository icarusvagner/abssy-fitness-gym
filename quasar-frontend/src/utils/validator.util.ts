export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const mobilePattern = /^(?:\+63|0)9\d{9}$/;
  const landlinePattern = /^(0\d{2,4})?(\d{7,8})$/;

  const sanitizedNumber = phoneNumber.replace(/\D/g, '');

  return (
    mobilePattern.test(sanitizedNumber) || landlinePattern.test(sanitizedNumber)
  );
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
