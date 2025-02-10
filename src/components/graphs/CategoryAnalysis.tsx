import React from 'react';
import { Transaction } from '../../types';
import { formatCurrency } from '../../utils/currency';
import { useStore } from '../../store';
import { Card } from '../common/Card';

interface CategoryAnalysisProps {
  transactions: Transaction[];
}

export function CategoryAnalysis({ transactions }: CategoryAnalysisProps) {
  const { categories } = useStore();

  const categoryData = categories.map(category => {
    const categoryTransactions = transactions.filter(t => t.category === category.id);
    const revenue = categoryTransactions
      .filter(t => t.type === 'revenue')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = categoryTransactions
      .filter(t => t.type === 'outgo')
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      name: category.name,
      revenue,
      expenses,
      total: revenue - expenses
    };
  }).filter(d => d.revenue > 0 || d.expenses > 0)
    .sort((a, b) => Math.abs(b.total) - Math.abs(a.total));

  const maxValue = Math.max(...categoryData.map(d => Math.max(d.revenue, d.expenses)));

  return (
    <Card>
      <h3 className="text-lg font-medium mb-4">Top Categories</h3>
      <div className="space-y-4">
        {categoryData.slice(0, 5).map((data, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="font-medium truncate mr-2">{data.name}</span>
              <span className={`text-sm ${data.total >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(data.total)}
              </span>
            </div>
            <div className="flex gap-1 h-6">
              {/* Revenue Bar */}
              <div className="flex-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${(data.revenue / maxValue) * 100}%`
                  }}
                />
              </div>
              {/* Expenses Bar */}
              <div className="flex-1 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${(data.expenses / maxValue) * 100}%`
                  }}
                />
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{formatCurrency(data.revenue)}</span>
              <span>{formatCurrency(data.expenses)}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="text-sm text-gray-600">Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="text-sm text-gray-600">Expenses</span>
        </div>
      </div>
    </Card>
  );
}