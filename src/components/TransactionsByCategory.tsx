import React from 'react';
import { Transaction } from '../types';
import { formatCurrency } from '../utils/currency';
import { format, parseISO } from 'date-fns';
import { X, Pencil } from 'lucide-react';
import { useStore } from '../store';

interface TransactionsByCategoryProps {
  transactions: Transaction[];
  categoryName: string;
  onClose: () => void;
  onEditTransaction: (transaction: Transaction) => void;
}

export function TransactionsByCategory({ 
  transactions, 
  categoryName, 
  onClose,
  onEditTransaction 
}: TransactionsByCategoryProps) {
  const { getPaymentMethodName } = useStore();
  
  // Sort transactions by date in descending order
  const sortedTransactions = [...transactions].sort((a, b) => 
    parseISO(b.date).getTime() - parseISO(a.date).getTime()
  );

  const revenue = transactions
    .filter(t => t.type === 'revenue')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const expenses = transactions
    .filter(t => t.type === 'outgo')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const total = revenue - expenses;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start p-4 border-b">
          <div className="flex-1">
            <h2 className="text-lg font-medium mb-2">{categoryName}</h2>
            <div className="flex flex-col">
              <div className={`text-xl font-bold mb-1 ${total >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(total)}
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-green-600">Revenue: {formatCurrency(revenue)}</span>
                <span className="text-red-600">Expenses: {formatCurrency(expenses)}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="ml-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Transaction List */}
        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-3">
            {sortedTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className={`bg-white border rounded-lg p-4 shadow-sm ${
                  transaction.type === 'revenue' 
                    ? 'bg-green-50/50 border-green-100' 
                    : 'bg-red-50/50 border-red-100'
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium mb-1 break-words">
                      {transaction.memo}
                    </div>
                    <div className="text-sm text-gray-500">
                      <div>{format(parseISO(transaction.date), 'MMM d, yyyy')}</div>
                      <div className="text-gray-400">
                        {getPaymentMethodName(transaction.paymentMethod)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`whitespace-nowrap font-medium ${
                      transaction.type === 'revenue' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatCurrency(transaction.amount)}
                    </span>
                    <button
                      onClick={() => {
                        onEditTransaction(transaction);
                        onClose();
                      }}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}