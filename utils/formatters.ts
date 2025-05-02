export const formatCurrency = (amount: number): string => {
  return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

export const extractNumericValue = (value: string): string => {
  // Remove all non-numeric characters except decimal point
  return value.replace(/[^0-9.]/g, '');
};