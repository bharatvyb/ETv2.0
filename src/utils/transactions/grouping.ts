import { Transaction } from '../../types';

export const groupTransactionsByType = (transactions: Transaction[]) => {
  return transactions.reduce((acc, transaction) => {
    if (transaction.type === 'revenue') {
      acc.revenue += transaction.amount;
    } else {
      acc.expenses += transaction.amount;
    }
    return acc;
  }, { revenue: 0, expenses: 0 });
};

export const groupTransactionsByCategory = (transactions: Transaction[]) => {
  return transactions.reduce((acc, transaction) => {
    const categoryId = transaction.category;
    if (!acc[categoryId]) {
      acc[categoryId] = { revenue: 0, expenses: 0 };
    }
    
    if (transaction.type === 'revenue') {
      acc[categoryId].revenue += transaction.amount;
    } else {
      acc[categoryId].expenses += transaction.amount;
    }
    
    return acc;
  }, {} as Record<string, { revenue: number; expenses: number }>);
};

export const groupTransactionsByPaymentMethod = (transactions: Transaction[]) => {
  return transactions.reduce((acc, transaction) => {
    const methodId = transaction.paymentMethod;
    if (!acc[methodId]) {
      acc[methodId] = { revenue: 0, expenses: 0 };
    }
    
    if (transaction.type === 'revenue') {
      acc[methodId].revenue += transaction.amount;
    } else {
      acc[methodId].expenses += transaction.amount;
    }
    
    return acc;
  }, {} as Record<string, { revenue: number; expenses: number }>);
};