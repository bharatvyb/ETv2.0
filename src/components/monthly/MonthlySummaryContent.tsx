import React from 'react';
import { Transaction, Category, PaymentMethod } from '../../types';
import { formatCurrency } from '../../utils/currency';
import { Card } from '../common';
import { groupTransactionsByCategory, groupTransactionsByPaymentMethod } from '../../utils/transactions/monthly';

interface MonthlySummaryContentProps {
  transactions: Transaction[];
  categories: Category[];
  paymentMethods: PaymentMethod[];
  onCategoryClick: (categoryId: string) => void;
  onPaymentMethodClick: (methodId: string) => void;
}

export function MonthlySummaryContent({
  transactions,
  categories,
  paymentMethods,
  onCategoryClick,
  onPaymentMethodClick,
}: MonthlySummaryContentProps) {
  // Get grouped data using utility functions
  const categoryTotals = groupTransactionsByCategory(transactions);
  const methodTotals = groupTransactionsByPaymentMethod(transactions);

  // Process category data
  const categoryData = categories
    .map(category => ({
      ...category,
      ...categoryTotals[category.id] || { revenue: 0, expenses: 0, total: 0 }
    }))
    .filter(c => c.revenue > 0 || c.expenses > 0)
    .sort((a, b) => Math.abs(b.total) - Math.abs(a.total));

  // Process payment method data
  const methodData = paymentMethods
    .map(method => ({
      ...method,
      ...methodTotals[method.id] || { revenue: 0, expenses: 0, total: 0 }
    }))
    .filter(m => m.revenue > 0 || m.expenses > 0)
    .sort((a, b) => Math.abs(b.total) - Math.abs(a.total));

  const SummaryItem = ({ 
    name, 
    revenue, 
    expenses, 
    total,
    onClick 
  }: { 
    name: string; 
    revenue: number; 
    expenses: number; 
    total: number;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-baseline mb-1">
          <span className="text-lg font-medium">{name}</span>
          <span className={`text-lg font-bold ${total >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(total)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-green-600">{formatCurrency(revenue)}</span>
          <span className="text-red-600">{formatCurrency(expenses)}</span>
        </div>
      </div>
    </button>
  );

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-xl font-bold mb-4">By Category</h2>
        <div className="space-y-2">
          {categoryData.length > 0 ? (
            categoryData.map(category => (
              <SummaryItem
                key={category.id}
                name={category.name}
                revenue={category.revenue}
                expenses={category.expenses}
                total={category.total}
                onClick={() => onCategoryClick(category.id)}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              No transactions in this month
            </div>
          )}
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold mb-4">By Payment Method</h2>
        <div className="space-y-2">
          {methodData.length > 0 ? (
            methodData.map(method => (
              <SummaryItem
                key={method.id}
                name={method.name}
                revenue={method.revenue}
                expenses={method.expenses}
                total={method.total}
                onClick={() => onPaymentMethodClick(method.id)}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              No transactions in this month
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}