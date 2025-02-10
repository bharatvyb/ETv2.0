import { Transaction } from '../../types';

export const calculateMonthlyTotals = (transactions: Transaction[]) => {
  return transactions.reduce((acc, transaction) => {
    if (transaction.type === 'revenue') {
      acc.revenue += transaction.amount;
    } else {
      acc.expenses += transaction.amount;
    }
    acc.balance = acc.revenue - acc.expenses;
    return acc;
  }, { revenue: 0, expenses: 0, balance: 0 });
};