import React, { useState } from 'react';
import { MonthPicker } from '../MonthPicker';
import { TransactionSummary } from '../TransactionSummary';
import { DailyTransactions } from './DailyTransactions';
import { EditTransactionDialog } from '../EditTransactionDialog';
import { TransactionsByCategory } from '../TransactionsByCategory';
import { TransactionsByPaymentMethod } from '../TransactionsByPaymentMethod';
import { PaymentMethodSummaryDialog } from './PaymentMethodSummaryDialog';
import { useStore } from '../../store';
import { Transaction } from '../../types';
import { filterTransactionsByMonth } from '../../utils/transactions';
import { Card } from '../common';

interface MonthlyTabProps {
  initialDate?: Date | null;
  onEditTransaction?: (transaction: Transaction) => void;
}

export function MonthlyTab({ initialDate, onEditTransaction }: MonthlyTabProps) {
  const [selectedDate, setSelectedDate] = useState(initialDate || new Date());
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [showPaymentMethodDialog, setShowPaymentMethodDialog] = useState(false);
  
  const { transactions } = useStore();

  // Filter transactions for the selected month
  const monthlyTransactions = filterTransactionsByMonth(transactions, selectedDate);

  // Group transactions by date
  const transactionsByDate = Object.entries(
    monthlyTransactions.reduce((acc, transaction) => {
      const date = transaction.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);
      return acc;
    }, {} as Record<string, Transaction[]>)
  ).sort(([a], [b]) => b.localeCompare(a));

  const handleEditTransaction = (transaction: Transaction) => {
    if (onEditTransaction) {
      onEditTransaction(transaction);
    } else {
      setEditingTransaction(transaction);
    }
  };

  return (
    <div className="space-y-4">
      <MonthPicker selectedDate={selectedDate} onChange={setSelectedDate} />

      <Card 
        className="bg-blue-50 cursor-pointer"
        onClick={() => setShowPaymentMethodDialog(true)}
      >
        <TransactionSummary transactions={monthlyTransactions} title="Summary" />
      </Card>

      <div className="space-y-4">
        {transactionsByDate.map(([date, transactions]) => (
          <DailyTransactions
            key={date}
            date={date}
            transactions={transactions}
            onEditTransaction={handleEditTransaction}
          />
        ))}
        {transactionsByDate.length === 0 && (
          <Card>
            <div className="text-center text-gray-500 py-8">
              No transactions in this month
            </div>
          </Card>
        )}
      </div>

      {editingTransaction && (
        <EditTransactionDialog
          transaction={editingTransaction}
          onClose={() => setEditingTransaction(null)}
          onTypeChange={(type) => {
            setEditingTransaction({ ...editingTransaction, type });
          }}
        />
      )}

      {selectedCategory && (
        <TransactionsByCategory
          transactions={monthlyTransactions.filter(t => t.category === selectedCategory)}
          categoryName={useStore.getState().getCategoryName(selectedCategory)}
          onClose={() => setSelectedCategory(null)}
          onEditTransaction={handleEditTransaction}
        />
      )}

      {selectedPaymentMethod && (
        <TransactionsByPaymentMethod
          transactions={monthlyTransactions.filter(t => t.paymentMethod === selectedPaymentMethod)}
          methodName={useStore.getState().getPaymentMethodName(selectedPaymentMethod)}
          onClose={() => setSelectedPaymentMethod(null)}
          onEditTransaction={handleEditTransaction}
        />
      )}

      {showPaymentMethodDialog && (
        <PaymentMethodSummaryDialog
          transactions={monthlyTransactions}
          onClose={() => setShowPaymentMethodDialog(false)}
        />
      )}
    </div>
  );
}