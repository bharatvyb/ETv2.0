import { Transaction } from '../../types';
import { format } from 'date-fns';

export function getMonthlyTransactions(transactions: Transaction[], selectedDate: Date) {
  const selectedMonth = format(selectedDate, 'yyyy-MM');
  
  return transactions.filter(transaction => {
    const transactionMonth = format(new Date(transaction.date), 'yyyy-MM');
    return transactionMonth === selectedMonth;
  });
}

export function calculateMonthlyTotals(transactions: Transaction[]) {
  return transactions.reduce((acc, transaction) => {
    if (transaction.type === 'revenue') {
      acc.revenue += transaction.amount;
    } else {
      acc.expenses += transaction.amount;
    }
    acc.balance = acc.revenue - acc.expenses;
    return acc;
  }, { revenue: 0, expenses: 0, balance: 0 });
}

export function groupTransactionsByCategory(transactions: Transaction[]) {
  return transactions.reduce((acc, transaction) => {
    const categoryId = transaction.category;
    if (!acc[categoryId]) {
      acc[categoryId] = { revenue: 0, expenses: 0, total: 0 };
    }
    
    if (transaction.type === 'revenue') {
      acc[categoryId].revenue += transaction.amount;
    } else {
      acc[categoryId].expenses += transaction.amount;
    }
    
    acc[categoryId].total = acc[categoryId].revenue - acc[categoryId].expenses;
    return acc;
  }, {} as Record<string, { revenue: number; expenses: number; total: number }>);
}

export function groupTransactionsByPaymentMethod(transactions: Transaction[]) {
  return transactions.reduce((acc, transaction) => {
    const methodId = transaction.paymentMethod;
    if (!acc[methodId]) {
      acc[methodId] = { revenue: 0, expenses: 0, total: 0 };
    }
    
    if (transaction.type === 'revenue') {
      acc[methodId].revenue += transaction.amount;
    } else {
      acc[methodId].expenses += transaction.amount;
    }
    
    acc[methodId].total = acc[methodId].revenue - acc[methodId].expenses;
    return acc;
  }, {} as Record<string, { revenue: number; expenses: number; total: number }>);
}