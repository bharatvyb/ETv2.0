import React from 'react';
import { PaymentMethod, Transaction } from '../../types';
import { formatCurrency } from '../../utils/currency';

interface PaymentMethodSummaryProps {
  method: PaymentMethod;
  transactions: Transaction[];
  onClick: () => void;
}

export function PaymentMethodSummary({ method, transactions, onClick }: PaymentMethodSummaryProps) {
  const total = transactions.reduce((sum, t) => sum + t.amount, 0);

  if (total === 0) return null;

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white p-4 rounded-lg shadow-sm hover:bg-gray-50 border"
    >
      <div className="flex justify-between items-center">
        <span className="font-medium">{method.name}</span>
        <span className="text-gray-600">{formatCurrency(total)}</span>
      </div>
    </button>
  );
}