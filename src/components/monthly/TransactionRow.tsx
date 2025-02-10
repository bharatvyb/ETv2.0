import React from 'react';
import { Transaction } from '../../types';
import { formatCurrency } from '../../utils/currency';
import { Pencil } from 'lucide-react';

interface TransactionRowProps {
  transaction: Transaction;
  categoryName: string;
  paymentMethodName: string;
  onEdit: (transaction: Transaction) => void;
}

export function TransactionRow({
  transaction,
  categoryName,
  paymentMethodName,
  onEdit,
}: TransactionRowProps) {
  return (
    <button
      onClick={() => onEdit(transaction)}
      className={`w-full text-left p-3 rounded-lg hover:shadow-md transition-all duration-200 border ${
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
          <div className="text-sm text-gray-500 truncate" title={`${categoryName} • ${paymentMethodName}`}>
            {categoryName} • {paymentMethodName}
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className={`${
            transaction.type === 'revenue' ? 'text-green-600' : 'text-red-600'
          } whitespace-nowrap font-medium`}>
            {formatCurrency(transaction.amount)}
          </span>
          <Pencil className="h-4 w-4 text-gray-400" />
        </div>
      </div>
    </button>
  );
}