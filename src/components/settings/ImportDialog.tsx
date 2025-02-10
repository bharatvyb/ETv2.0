import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useStore } from '../../store';
import { parseTSV, transformTransactions } from '../../utils/import/tsv';
import { Button } from '../common';

interface ImportDialogProps {
  onClose: () => void;
}

export function ImportDialog({ onClose }: ImportDialogProps) {
  const [importing, setImporting] = useState(false);
  const [stats, setStats] = useState<{
    newTransactions: number;
    skippedTransactions: number;
    newCategories: number;
    newPaymentMethods: number;
  } | null>(null);

  const handleImport = async (content: string) => {
    try {
      setImporting(true);
      
      const store = useStore.getState();
      const initialState = {
        categories: store.categories.length,
        paymentMethods: store.paymentMethods.length,
        transactions: store.transactions.length
      };
      
      // Parse and transform data
      const parsedData = parseTSV(content);
      const newTransactions = transformTransactions(parsedData);
      
      // Add new transactions
      newTransactions.forEach(transaction => {
        store.addTransaction(transaction);
      });

      // Calculate import statistics
      const finalState = useStore.getState();
      setStats({
        newTransactions: newTransactions.length,
        skippedTransactions: parsedData.transactions.length - newTransactions.length,
        newCategories: finalState.categories.length - initialState.categories,
        newPaymentMethods: finalState.paymentMethods.length - initialState.paymentMethods
      });

    } catch (error) {
      console.error('Import failed:', error);
      alert('Failed to import data. Please check the file format.');
      onClose();
    } finally {
      setImporting(false);
    }
  };

  const handleClose = () => {
    if (stats) {
      window.location.reload(); // Reload only if import was successful
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">Import Data</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {!stats ? (
            <>
              <div className="text-sm text-gray-600">
                <p className="mb-2">Select your TSV file to import:</p>
                <ul className="list-disc ml-4 space-y-1">
                  <li>Only new transactions will be imported</li>
                  <li>Duplicate transactions will be skipped</li>
                  <li>New categories and payment methods will be added</li>
                </ul>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="secondary" onClick={onClose} disabled={importing}>
                  Cancel
                </Button>
                <label className="relative">
                  <Button variant="primary" disabled={importing}>
                    {importing ? 'Importing...' : 'Select File'}
                  </Button>
                  <input
                    type="file"
                    accept=".tsv"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          const content = e.target?.result as string;
                          handleImport(content);
                        };
                        reader.readAsText(file);
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={importing}
                  />
                </label>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-3">
                <h3 className="font-medium">Import Summary:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>New Transactions:</span>
                    <span className="font-medium text-green-600">{stats.newTransactions}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Skipped Duplicates:</span>
                    <span className="font-medium text-gray-600">{stats.skippedTransactions}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>New Categories:</span>
                    <span className="font-medium text-blue-600">{stats.newCategories}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>New Payment Methods:</span>
                    <span className="font-medium text-blue-600">{stats.newPaymentMethods}</span>
                  </li>
                </ul>
              </div>

              <div className="flex justify-end">
                <Button variant="primary" onClick={handleClose}>
                  Done
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}