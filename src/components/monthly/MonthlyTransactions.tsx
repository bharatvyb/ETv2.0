import React from 'react';
import { DailyTransactions } from './DailyTransactions';
import { Transaction } from '../../types';
import { Card } from '../common';

interface MonthlyTransactionsProps {
  transactionsByDate: [string, Transaction[]][];
  onEditTransaction: (transaction: Transaction) => void;
}

export function MonthlyTransactions({ transactionsByDate, onEditTransaction }: MonthlyTransactionsProps) {
  return (
    <div className="space-y-4">
      {transactionsByDate.map(([date, transactions]) => (
        <DailyTransactions
          key={date}
          date={date}
          transactions={transactions}
          onEditTransaction={onEditTransaction}
        />
      ))}
      {transactionsByDate.length === 0 && (
        <Card>
          <div className="text-center text-gray-500 py-8">
            No transactions in this month
          </div>
        </Card>
      )}
    </div>
  );
}