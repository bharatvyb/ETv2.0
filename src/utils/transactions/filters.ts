import { Transaction } from '../../types';
import { startOfMonth, endOfMonth, parseISO } from 'date-fns';

export const filterTransactionsByMonth = (transactions: Transaction[], date: Date) => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  
  return transactions.filter(transaction => {
    const transactionDate = parseISO(transaction.date);
    return transactionDate >= start && transactionDate <= end;
  });
};