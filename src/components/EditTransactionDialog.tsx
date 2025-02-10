import React from 'react';
import { Transaction, TransactionType } from '../types';
import { TransactionForm } from './TransactionForm';
import { X, Trash2 } from 'lucide-react';
import { useStore } from '../store';

interface EditTransactionDialogProps {
  transaction: Transaction;
  onClose: () => void;
  onTypeChange: (type: TransactionType) => void;
}

export function EditTransactionDialog({ transaction, onClose, onTypeChange }: EditTransactionDialogProps) {
  const [currentType, setCurrentType] = React.useState<TransactionType>(transaction.type);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const { deleteTransaction } = useStore();

  const handleTypeChange = (type: TransactionType) => {
    setCurrentType(type);
    onTypeChange(type);
  };

  const handleDelete = () => {
    deleteTransaction(transaction.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">Edit Transaction</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transaction Type
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => handleTypeChange('revenue')}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                  currentType === 'revenue'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Revenue
              </button>
              <button
                onClick={() => handleTypeChange('outgo')}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                  currentType === 'outgo'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Expense
              </button>
            </div>
          </div>
          
          <TransactionForm
            type={currentType}
            editingTransaction={{...transaction, type: currentType}}
            onSave={onClose}
          />
        </div>

        {/* Delete Confirmation Dialog */}
        {showDeleteConfirm && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
              <h3 className="text-lg font-medium mb-4">Delete Transaction</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this transaction? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}