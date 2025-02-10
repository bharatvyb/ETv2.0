import React from 'react';
import { useStore } from '../store';
import { format } from 'date-fns';
import { formatCurrency } from '../utils/currency';
import { Pencil, Trash2 } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionListProps {
  date: string;
  onEdit: (transaction: Transaction) => void;
}

export function TransactionList({ date, onEdit }: TransactionListProps) {
  const { transactions, categories, paymentMethods, deleteTransaction } = useStore();

  const todayTransactions = transactions.filter((t) => t.date === date);
  const revenue = todayTransactions.filter((t) => t.type === 'revenue')
    .reduce((sum, t) => sum + t.amount, 0);
  const outgo = todayTransactions.filter((t) => t.type === 'outgo')
    .reduce((sum, t) => sum + t.amount, 0);

  const getCategoryName = (id: string) => 
    categories.find((c) => c.id === id)?.name || 'Unknown';

  const getPaymentMethodName = (id: string) =>
    paymentMethods.find((m) => m.id === id)?.name || 'Unknown';

  if (todayTransactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200/50 p-8 text-center text-gray-500">
        No transactions for {format(new Date(date), 'MMMM d, yyyy')}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md border border-gray-200/50 p-4">
        <div className="flex justify-between text-sm font-medium">
          <div className="text-green-600">Revenue: {formatCurrency(revenue)}</div>
          <div className="text-red-600">Expenses: {formatCurrency(outgo)}</div>
        </div>
      </div>

      <div className="space-y-2">
        {todayTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className={`p-3 rounded-lg hover:shadow-md transition-all duration-200 border ${
              transaction.type === 'revenue' 
                ? 'bg-green-50/50 border-green-100 hover:bg-green-50' 
                : 'bg-red-50/50 border-red-100 hover:bg-red-50'
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate mb-1" title={transaction.memo}>
                  {transaction.memo}
                </div>
                <div className="text-sm text-gray-500 truncate" title={`${getCategoryName(transaction.category)} • ${getPaymentMethodName(transaction.paymentMethod)}`}>
                  {getCategoryName(transaction.category)} • {getPaymentMethodName(transaction.paymentMethod)}
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`${
                  transaction.type === 'revenue' ? 'text-green-600' : 'text-red-600'
                } whitespace-nowrap font-medium`}>
                  {formatCurrency(transaction.amount)}
                </span>
                <button
                  onClick={() => onEdit(transaction)}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deleteTransaction(transaction.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}