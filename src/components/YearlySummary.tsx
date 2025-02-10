import React from 'react';
import { Transaction } from '../types';
import { formatCurrency } from '../utils/currency';

interface YearlySummaryProps {
  transactions: Transaction[];
  selectedYear: Date;
}

export function YearlySummary({ transactions, selectedYear }: YearlySummaryProps) {
  const revenue = transactions
    .filter(t => t.type === 'revenue')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const expenses = transactions
    .filter(t => t.type === 'outgo')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = revenue - expenses;

  return (
    <div className="bg-blue-50 rounded-lg shadow-md border border-gray-200/50 p-4">
      <h3 className="text-lg font-medium mb-4 text-blue-900">Summary</h3>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="text-sm text-blue-900/70 mb-1">Revenue</div>
          <div className="font-medium text-green-600 truncate" title={formatCurrency(revenue)}>
            {formatCurrency(revenue)}
          </div>
        </div>
        
        <div>
          <div className="text-sm text-blue-900/70 mb-1">Expenses</div>
          <div className="font-medium text-red-600 truncate" title={formatCurrency(expenses)}>
            {formatCurrency(expenses)}
          </div>
        </div>
        
        <div>
          <div className="text-sm text-blue-900/70 mb-1">Balance</div>
          <div 
            className={`font-medium truncate ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}
            title={formatCurrency(balance)}
          >
            {formatCurrency(balance)}
          </div>
        </div>
      </div>
    </div>
  );
}