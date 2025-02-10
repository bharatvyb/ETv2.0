import { startOfMonth, endOfMonth, format, parse } from 'date-fns';

export const getMonthBounds = (date: Date) => {
  const start = format(startOfMonth(date), 'yyyy-MM-dd');
  const end = format(endOfMonth(date), 'yyyy-MM-dd');
  return { start, end };
};

export const formatMonthYear = (date: Date) => format(date, 'MMMM yyyy');

export const isDateInMonth = (date: string, monthDate: Date) => {
  const transactionDate = parse(date, 'yyyy-MM-dd', new Date());
  const start = startOfMonth(monthDate);
  const end = endOfMonth(monthDate);
  return transactionDate >= start && transactionDate <= end;
};