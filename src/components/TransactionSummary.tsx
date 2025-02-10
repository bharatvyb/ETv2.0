import React from 'react';
import { Transaction } from '../types';
import { formatCurrency } from '../utils/currency';
import { TrendingUp, TrendingDown, Wallet2 } from 'lucide-react';

interface TransactionSummaryProps {
  transactions: Transaction[];
  title?: string;
  onClick?: () => void;
}

export function TransactionSummary({ transactions, title = "Summary", onClick }: TransactionSummaryProps) {
  const revenue = transactions
    .filter((t) => t.type === 'revenue')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const expenses = transactions
    .filter((t) => t.type === 'outgo')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const balance = revenue - expenses;

  return (
    <div 
      className={`bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm border border-blue-200 p-6 ${
        onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-blue-900">{title}</h3>
        <Wallet2 className="h-6 w-6 text-blue-600" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-green-600">
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm font-medium">Revenue</span>
          </div>
          <div className="text-xl font-bold text-green-600">
            {formatCurrency(revenue)}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-red-600">
            <TrendingDown className="h-5 w-5" />
            <span className="text-sm font-medium">Expenses</span>
          </div>
          <div className="text-xl font-bold text-red-600">
            {formatCurrency(expenses)}
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-blue-600">
            <Wallet2 className="h-5 w-5" />
            <span className="text-sm font-medium">Balance</span>
          </div>
          <div className={`text-xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(balance)}
          </div>
        </div>
      </div>
    </div>
  );
}