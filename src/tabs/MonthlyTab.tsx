import React, { useState } from 'react';
import { MonthPicker } from '../components/MonthPicker';
import { MonthlySearchBar } from '../components/monthly/MonthlySearchBar';
import { MonthlyTransactions } from '../components/monthly/MonthlyTransactions';
import { MonthlySummaryView } from '../components/monthly/MonthlySummaryView';
import { EditTransactionDialog } from '../components/EditTransactionDialog';
import { TransactionsByCategory } from '../components/TransactionsByCategory';
import { TransactionsByPaymentMethod } from '../components/TransactionsByPaymentMethod';
import { MonthlySummaryDialog } from '../components/MonthlySummaryDialog';
import { useStore } from '../store';
import { Transaction } from '../types';
import { filterTransactionsByMonth } from '../utils/transactions';
import { TabButton } from '../components/common';

interface MonthlyTabProps {
  initialDate?: Date | null;
  onEditTransaction?: (transaction: Transaction) => void;
}

export function MonthlyTab({ initialDate, onEditTransaction }: MonthlyTabProps) {
  const [selectedDate, setSelectedDate] = useState(initialDate || new Date());
  const [activeView, setActiveView] = useState<'transactions' | 'summary'>('transactions');
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [showSummaryDialog, setShowSummaryDialog] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[] | null>(null);
  
  const { transactions } = useStore();

  // Filter transactions for the selected month
  const monthlyTransactions = filterTransactionsByMonth(transactions, selectedDate);

  // Use filtered transactions if available, otherwise use monthly transactions
  const displayTransactions = filteredTransactions || monthlyTransactions;

  // Group transactions by date
  const transactionsByDate = Object.entries(
    displayTransactions.reduce((acc, transaction) => {
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

      <MonthlySearchBar 
        transactions={monthlyTransactions}
        onFilter={setFilteredTransactions}
        onSummaryClick={() => setShowSummaryDialog(true)}
      />

      <div className="flex justify-center space-x-2">
        <TabButton
          active={activeView === 'transactions'}
          onClick={() => setActiveView('transactions')}
        >
          Transactions
        </TabButton>
        <TabButton
          active={activeView === 'summary'}
          onClick={() => setActiveView('summary')}
        >
          Summary
        </TabButton>
      </div>

      {activeView === 'transactions' ? (
        <MonthlyTransactions
          transactionsByDate={transactionsByDate}
          onEditTransaction={handleEditTransaction}
        />
      ) : (
        <MonthlySummaryView 
          transactions={displayTransactions}
          onEditTransaction={handleEditTransaction}
        />
      )}

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
          transactions={displayTransactions.filter(t => t.category === selectedCategory)}
          categoryName={useStore.getState().getCategoryName(selectedCategory)}
          onClose={() => setSelectedCategory(null)}
          onEditTransaction={handleEditTransaction}
        />
      )}

      {selectedPaymentMethod && (
        <TransactionsByPaymentMethod
          transactions={displayTransactions.filter(t => t.paymentMethod === selectedPaymentMethod)}
          methodName={useStore.getState().getPaymentMethodName(selectedPaymentMethod)}
          onClose={() => setSelectedPaymentMethod(null)}
          onEditTransaction={handleEditTransaction}
        />
      )}

      {showSummaryDialog && (
        <MonthlySummaryDialog
          transactions={monthlyTransactions}
          selectedDate={selectedDate}
          onClose={() => setShowSummaryDialog(false)}
        />
      )}
    </div>
  );
}