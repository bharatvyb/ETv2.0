import React, { useEffect, useState } from 'react';
import { useStore } from '../store';
import { TransactionType, Transaction } from '../types';
import { format } from 'date-fns';

interface TransactionFormProps {
  type: TransactionType;
  editingTransaction?: Transaction | null;
  onSave?: () => void;
  selectedDate: Date;
}

export function TransactionForm({ 
  type, 
  editingTransaction, 
  onSave,
  selectedDate
}: TransactionFormProps) {
  const { categories, paymentMethods, addTransaction, updateTransaction } = useStore();
  const [date, setDate] = useState(selectedDate);
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  // Set default values from categories and payment methods
  useEffect(() => {
    const defaultCategory = categories.find(c => c.isDefault);
    const defaultMethod = paymentMethods.find(m => m.isDefault);
    
    if (defaultCategory && !category) {
      setCategory(defaultCategory.id);
    }
    if (defaultMethod && !paymentMethod) {
      setPaymentMethod(defaultMethod.id);
    }
  }, [categories, paymentMethods]);

  // Load editing transaction data
  useEffect(() => {
    if (editingTransaction) {
      setDate(new Date(editingTransaction.date));
      setAmount(editingTransaction.amount.toString());
      setMemo(editingTransaction.memo);
      setCategory(editingTransaction.category);
      setPaymentMethod(editingTransaction.paymentMethod);
    }
  }, [editingTransaction]);

  // Update date when selectedDate changes
  useEffect(() => {
    if (!editingTransaction) {
      setDate(selectedDate);
    }
  }, [selectedDate, editingTransaction]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const transaction = {
      type,
      date: format(date, 'yyyy-MM-dd'),
      amount: parseFloat(amount),
      memo,
      category,
      paymentMethod,
    };

    if (editingTransaction) {
      updateTransaction({ ...transaction, id: editingTransaction.id });
    } else {
      addTransaction(transaction);
    }

    // Reset form
    setAmount('');
    setMemo('');
    
    // Notify parent
    onSave?.();
  };

  const inputClasses = `
    w-full px-4 py-3 text-gray-900 bg-white
    rounded-xl border border-gray-200
    focus:border-blue-500 focus:ring-1 focus:ring-blue-500
    placeholder:text-gray-400
    text-base
  `;

  const labelClasses = "block text-sm font-medium text-gray-600 mb-2";

  const selectClasses = `
    w-full px-4 py-3 text-gray-900 bg-white
    rounded-xl border border-gray-200
    focus:border-blue-500 focus:ring-1 focus:ring-blue-500
    appearance-none
    bg-no-repeat
    bg-[length:20px_20px]
    bg-[center_right_1rem]
    bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%236b7280%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')]
  `;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Date Field */}
      <div>
        <label className={labelClasses}>
          Date
        </label>
        <input
          type="date"
          value={format(date, 'yyyy-MM-dd')}
          onChange={(e) => setDate(new Date(e.target.value))}
          className={inputClasses}
        />
      </div>

      {/* Amount Field */}
      <div>
        <label htmlFor="amount" className={labelClasses}>
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className={inputClasses}
          required
          step="0.01"
        />
      </div>

      {/* Memo Field */}
      <div>
        <label htmlFor="memo" className={labelClasses}>
          Memo
        </label>
        <input
          type="text"
          id="memo"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="Enter description"
          className={inputClasses}
          required
        />
      </div>

      {/* Category Field */}
      <div>
        <label htmlFor="category" className={labelClasses}>
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={selectClasses}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name} {cat.isDefault ? '(Default)' : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Payment Method Field */}
      <div>
        <label htmlFor="paymentMethod" className={labelClasses}>
          Payment Method
        </label>
        <select
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className={selectClasses}
        >
          {paymentMethods.map((method) => (
            <option key={method.id} value={method.id}>
              {method.name} {method.isDefault ? '(Default)' : ''}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className={`
          w-full py-3 rounded-xl text-white font-medium
          transition-all duration-200
          ${type === 'revenue' 
            ? 'bg-green-600 hover:bg-green-700 active:bg-green-800' 
            : 'bg-red-600 hover:bg-red-700 active:bg-red-800'
          }
        `}
      >
        {editingTransaction ? 'Update' : 'Add'} {type === 'revenue' ? 'Revenue' : 'Expense'}
      </button>
    </form>
  );
}