import React from 'react';
import { Transaction, PaymentMethod } from '../../types';
import { formatCurrency } from '../../utils/currency';
import { Card } from '../common';

interface PaymentMethodOverviewProps {
  transactions: Transaction[];
  paymentMethods: PaymentMethod[];
}

export function PaymentMethodOverview({ transactions, paymentMethods }: PaymentMethodOverviewProps) {
  const methodData = paymentMethods.map(method => {
    const methodTransactions = transactions.filter(t => t.paymentMethod === method.id);
    const revenue = methodTransactions
      .filter(t => t.type === 'revenue')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = methodTransactions
      .filter(t => t.type === 'outgo')
      .reduce((sum, t) => sum + t.amount, 0);
    return { ...method, revenue, expenses, total: revenue - expenses };
  }).filter(m => m.revenue > 0 || m.expenses > 0)
    .sort((a, b) => Math.abs(b.total) - Math.abs(a.total));

  return (
    <Card>
      <h2 className="text-xl font-bold mb-4">By Payment Method</h2>
      <div className="space-y-3">
        {methodData.length > 0 ? (
          methodData.map(method => (
            <div 
              key={method.id}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-lg font-medium">{method.name}</span>
                <span className={`text-lg font-bold ${
                  method.total >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatCurrency(method.total)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-green-600">Revenue: {formatCurrency(method.revenue)}</span>
                <span className="text-red-600">Expenses: {formatCurrency(method.expenses)}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            No transactions in this month
          </div>
        )}
      </div>
    </Card>
  );
}