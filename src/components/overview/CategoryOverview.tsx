import React from 'react';
import { Transaction, Category } from '../../types';
import { formatCurrency } from '../../utils/currency';
import { Card } from '../common';

interface CategoryOverviewProps {
  transactions: Transaction[];
  categories: Category[];
}

export function CategoryOverview({ transactions, categories }: CategoryOverviewProps) {
  const categoryData = categories.map(category => {
    const categoryTransactions = transactions.filter(t => t.category === category.id);
    const revenue = categoryTransactions
      .filter(t => t.type === 'revenue')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = categoryTransactions
      .filter(t => t.type === 'outgo')
      .reduce((sum, t) => sum + t.amount, 0);
    return { ...category, revenue, expenses, total: revenue - expenses };
  }).filter(c => c.revenue > 0 || c.expenses > 0)
    .sort((a, b) => Math.abs(b.total) - Math.abs(a.total));

  return (
    <Card>
      <h2 className="text-xl font-bold mb-4">By Category</h2>
      <div className="space-y-3">
        {categoryData.length > 0 ? (
          categoryData.map(category => (
            <div 
              key={category.id}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex justify-between items-baseline mb-2">
                <span className="text-lg font-medium">{category.name}</span>
                <span className={`text-lg font-bold ${
                  category.total >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatCurrency(category.total)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-green-600">Revenue: {formatCurrency(category.revenue)}</span>
                <span className="text-red-600">Expenses: {formatCurrency(category.expenses)}</span>
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