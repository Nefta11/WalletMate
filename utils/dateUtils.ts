import { format } from 'date-fns';

export const formatDateForDisplay = (date: Date): string => {
  return format(date, 'MMM d, yyyy');
};

export const formatMonthYear = (date: Date): string => {
  return format(date, 'MMMM yyyy');
};

export const getMonthName = (month: number): string => {
  const date = new Date();
  date.setMonth(month);
  return format(date, 'MMMM');
};

export const getMonthsArray = (): string[] => {
  return [
    'January', 'February', 'March', 'April', 
    'May', 'June', 'July', 'August', 
    'September', 'October', 'November', 'December'
  ];
};