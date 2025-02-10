import React from 'react';
import { Transaction } from '../../types';
import { format } from 'date-fns';
import { TransactionRow } from './TransactionRow';
import { useStore } from '../../store';
import { Card } from '../common/Card';
import { formatCurrency } from '../../utils/currency';

interface DailyTransactionsProps {
  date: string;
  transactions: Transaction[];
  onEditTransaction: (transaction: Transaction) => void;
}

export function DailyTransactions({
  date,
  transactions,
  onEditTransaction,
}: DailyTransactionsProps) {
  const { getCategoryName, getPaymentMethodName } = useStore();

  const revenue = transactions
    .filter(t => t.type === 'revenue')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const expenses = transactions
    .filter(t => t.type === 'outgo')
    .reduce((sum, t) => sum + t.amount, 0);

  const total = revenue - expenses;

  return (
    <Card>
      <div className="flex flex-col gap-2">
        {/* Header with Date and Totals */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-medium">
              {format(new Date(date), 'd')}
            </span>
            <span className="text-sm text-gray-500">
              {format(new Date(date), 'MMM')}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex flex-col items-end">
              <span className={`font-medium ${total >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(total)}
              </span>
              <div className="flex gap-3 text-xs">
                <span className="text-green-600">{formatCurrency(revenue)}</span>
                <span className="text-red-600">{formatCurrency(expenses)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-2 mt-2">
          {transactions.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              categoryName={getCategoryName(transaction.category)}
              paymentMethodName={getPaymentMethodName(transaction.paymentMethod)}
              onEdit={onEditTransaction}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}