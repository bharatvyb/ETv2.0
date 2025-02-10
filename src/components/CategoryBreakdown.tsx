import React from 'react';
import { Transaction, Category } from '../types';
import { formatCurrency } from '../utils/currency';

interface CategoryBreakdownProps {
  transactions: Transaction[];
  categories: Category[];
  onCategoryClick?: (categoryId: string) => void;
}

export function CategoryBreakdown({ 
  transactions, 
  categories,
  onCategoryClick 
}: CategoryBreakdownProps) {
  const categoryTotals = categories.map(category => {
    const total = transactions
      .filter(t => t.category === category.id)
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      ...category,
      total
    };
  }).filter(c => c.total > 0)
    .sort((a, b) => b.total - a.total);

  return (
    <div className="space-y-2">
      {categoryTotals.map(category => (
        <button
          key={category.id}
          onClick={() => onCategoryClick?.(category.id)}
          className="w-full text-left bg-white p-4 rounded-lg shadow-sm hover:bg-gray-50"
        >
          <div className="flex justify-between items-center">
            <span className="font-medium">{category.name}</span>
            <span className="text-gray-600">{formatCurrency(category.total)}</span>
          </div>
        </button>
      ))}
    </div>
  );
}