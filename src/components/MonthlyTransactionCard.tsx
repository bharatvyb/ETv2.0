import React from 'react';
import { Transaction } from '../types';
import { formatCurrency } from '../utils/currency';
import { Pencil } from 'lucide-react';

interface MonthlyTransactionCardProps {
  transaction: Transaction;
  categoryName: string;
  paymentMethodName: string;
  onEdit: (transaction: Transaction) => void;
}

export function MonthlyTransactionCard({
  transaction,
  categoryName,
  paymentMethodName,
  onEdit,
}: MonthlyTransactionCardProps) {
  return (
    <div className="flex justify-between items-start p-3 bg-white border border-gray-200/50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 gap-3">
      <div className="min-w-0 flex-1">
        <div className="font-medium break-all">
          {transaction.memo}
        </div>
        <div className="text-sm text-gray-500 truncate" title={`${categoryName} • ${paymentMethodName}`}>
          {categoryName} • {paymentMethodName}
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <span 
          className={`${
            transaction.type === 'revenue' ? 'text-green-600' : 'text-red-600'
          } whitespace-nowrap`}
        >
          {formatCurrency(transaction.amount)}
        </span>
        <button
          onClick={() => onEdit(transaction)}
          className="p-1 text-gray-400 hover:text-blue-600 transition-colors flex-shrink-0"
        >
          <Pencil className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}