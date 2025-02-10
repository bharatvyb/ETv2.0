import React, { useState } from 'react';
import { Transaction } from '../../types';
import { useStore } from '../../store';
import { formatCurrency } from '../../utils/currency';
import { Card } from '../common';
import { TransactionsByCategory } from '../TransactionsByCategory';
import { TransactionsByPaymentMethod } from '../TransactionsByPaymentMethod';

interface MonthlySummaryViewProps {
  transactions: Transaction[];
  onEditTransaction?: (transaction: Transaction) => void;
}

export function MonthlySummaryView({ transactions, onEditTransaction }: MonthlySummaryViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const { categories, paymentMethods } = useStore();

  // Calculate category totals
  const categoryTotals = categories.map(category => {
    const categoryTransactions = transactions.filter(t => t.category === category.id);
    const revenue = categoryTransactions
      .filter(t => t.type === 'revenue')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = categoryTransactions
      .filter(t => t.type === 'outgo')
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      ...category,
      revenue,
      expenses,
      total: revenue - expenses
    };
  }).filter(c => c.revenue > 0 || c.expenses > 0)
    .sort((a, b) => Math.abs(b.total) - Math.abs(a.total));

  // Calculate payment method totals
  const methodTotals = paymentMethods.map(method => {
    const methodTransactions = transactions.filter(t => t.paymentMethod === method.id);
    const revenue = methodTransactions
      .filter(t => t.type === 'revenue')
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = methodTransactions
      .filter(t => t.type === 'outgo')
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      ...method,
      revenue,
      expenses,
      total: revenue - expenses
    };
  }).filter(m => m.revenue > 0 || m.expenses > 0)
    .sort((a, b) => Math.abs(b.total) - Math.abs(a.total));

  const handleEditTransaction = (transaction: Transaction) => {
    if (onEditTransaction) {
      onEditTransaction(transaction);
    }
    setSelectedCategory(null);
    setSelectedPaymentMethod(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-xl font-bold mb-4">By Category</h2>
        <div className="space-y-3">
          {categoryTotals.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className="w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
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
            </button>
          ))}
          {categoryTotals.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No transactions in this month
            </div>
          )}
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold mb-4">By Payment Method</h2>
        <div className="space-y-3">
          {methodTotals.map(method => (
            <button
              key={method.id}
              onClick={() => setSelectedPaymentMethod(method.id)}
              className="w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
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
            </button>
          ))}
          {methodTotals.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No transactions in this month
            </div>
          )}
        </div>
      </Card>

      {selectedCategory && (
        <TransactionsByCategory
          transactions={transactions.filter(t => t.category === selectedCategory)}
          categoryName={useStore.getState().getCategoryName(selectedCategory)}
          onClose={() => setSelectedCategory(null)}
          onEditTransaction={handleEditTransaction}
        />
      )}

      {selectedPaymentMethod && (
        <TransactionsByPaymentMethod
          transactions={transactions.filter(t => t.paymentMethod === selectedPaymentMethod)}
          methodName={useStore.getState().getPaymentMethodName(selectedPaymentMethod)}
          onClose={() => setSelectedPaymentMethod(null)}
          onEditTransaction={handleEditTransaction}
        />
      )}
    </div>
  );
}