import React, { useState, useEffect } from 'react';
import { TabButton } from '../components/TabButton';
import { TransactionForm } from '../components/TransactionForm';
import { TransactionList } from '../components/TransactionList';
import { format, parseISO } from 'date-fns';
import { Transaction, TransactionType } from '../types';
import { DatePicker } from '../components/DatePicker';
import { Card } from '../components/common/Card';

interface RecordTabProps {
  initialTransaction?: Transaction | null;
  onTransactionSaved?: () => void;
}

export function RecordTab({ initialTransaction, onTransactionSaved }: RecordTabProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeType, setActiveType] = useState<TransactionType>('outgo');
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  // Handle initial transaction for editing
  useEffect(() => {
    if (initialTransaction) {
      setActiveType(initialTransaction.type);
      setEditingTransaction(initialTransaction);
      setSelectedDate(parseISO(initialTransaction.date));
    }
  }, [initialTransaction]);

  const handleEditTransaction = (transaction: Transaction) => {
    setActiveType(transaction.type);
    setEditingTransaction(transaction);
  };

  const handleSave = () => {
    setEditingTransaction(null);
    onTransactionSaved?.();
  };

  return (
    <div className="space-y-6">
      {/* Top Date Navigation */}
      <DatePicker selectedDate={selectedDate} onChange={setSelectedDate} />

      {/* Centered Tabs */}
      <div className="flex justify-center space-x-2">
        <TabButton
          active={activeType === 'revenue'}
          onClick={() => setActiveType('revenue')}
          variant="success"
        >
          Revenue
        </TabButton>
        <TabButton
          active={activeType === 'outgo'}
          onClick={() => setActiveType('outgo')}
          variant="danger"
        >
          Expense
        </TabButton>
      </div>

      {/* Transaction Form Card */}
      <Card 
        className={`${
          activeType === 'revenue' 
            ? 'bg-green-50/80 border-2 border-green-200' 
            : 'bg-red-50/80 border-2 border-red-200'
        }`}
      >
        <h2 className="text-lg font-medium mb-4">
          {editingTransaction ? 'Edit Transaction' : 'New Transaction'}
        </h2>
        <TransactionForm 
          type={activeType} 
          editingTransaction={editingTransaction}
          onSave={handleSave}
          selectedDate={selectedDate}
        />
      </Card>

      {/* Transactions List */}
      <div className="mt-8">
        <h2 className="text-lg font-medium mb-4">
          Transactions for {format(selectedDate, 'MMMM d, yyyy')}
        </h2>
        <TransactionList 
          date={format(selectedDate, 'yyyy-MM-dd')} 
          onEdit={handleEditTransaction}
        />
      </div>
    </div>
  );
}