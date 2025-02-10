import React from 'react';
import { X } from 'lucide-react';
import { Transaction } from '../../types';
import { useStore } from '../../store';
import { formatCurrency } from '../../utils/currency';

interface PaymentMethodSummaryDialogProps {
  transactions: Transaction[];
  onClose: () => void;
}

export function PaymentMethodSummaryDialog({ transactions, onClose }: PaymentMethodSummaryDialogProps) {
  const { paymentMethods } = useStore();

  // Calculate totals by payment method
  const methodTotals = paymentMethods.map(method => {
    const methodTransactions = transactions.filter(t => t.paymentMethod === method.id);
    
    // Calculate revenue
    const revenue = methodTransactions
      .filter(t => t.type === 'revenue')
      .reduce((sum, t) => sum + t.amount, 0);
    
    // Calculate expenses
    const expenses = methodTransactions
      .filter(t => t.type === 'outgo')
      .reduce((sum, t) => sum + t.amount, 0);
    
    // Calculate total
    const total = revenue - expenses;
    
    return { 
      id: method.id,
      name: method.name,
      revenue,
      expenses,
      total,
      hasTransactions: revenue > 0 || expenses > 0
    };
  }).filter(m => m.hasTransactions)
    .sort((a, b) => Math.abs(b.total) - Math.abs(a.total));

  // Calculate grand totals
  const grandTotal = {
    revenue: methodTotals.reduce((sum, m) => sum + m.revenue, 0),
    expenses: methodTotals.reduce((sum, m) => sum + m.expenses, 0),
    total: methodTotals.reduce((sum, m) => sum + m.total, 0)
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">Payment Method Summary</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4">
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Method</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Revenue</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Expenses</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {methodTotals.map(method => (
                  <tr key={method.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                      {method.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-green-600">
                      {formatCurrency(method.revenue)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-red-600">
                      {formatCurrency(method.expenses)}
                    </td>
                    <td className={`px-4 py-3 text-sm text-right font-medium ${
                      method.total >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatCurrency(method.total)}
                    </td>
                  </tr>
                ))}
                {methodTotals.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
              {methodTotals.length > 0 && (
                <tfoot className="bg-gray-50 font-medium">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">Total</td>
                    <td className="px-4 py-3 text-sm text-right text-green-600">
                      {formatCurrency(grandTotal.revenue)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-red-600">
                      {formatCurrency(grandTotal.expenses)}
                    </td>
                    <td className={`px-4 py-3 text-sm text-right ${
                      grandTotal.total >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatCurrency(grandTotal.total)}
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}