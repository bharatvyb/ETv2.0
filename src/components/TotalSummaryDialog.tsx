import React from 'react';
import { X } from 'lucide-react';
import { useStore } from '../store';
import { MonthlyGraph } from './graphs/MonthlyGraph';
import { CategoryAnalysis } from './graphs/CategoryAnalysis';
import { PaymentMethodAnalysis } from './graphs/PaymentMethodAnalysis';
import { format } from 'date-fns';

interface TotalSummaryDialogProps {
  selectedYear: Date;
  onClose: () => void;
}

export function TotalSummaryDialog({ selectedYear, onClose }: TotalSummaryDialogProps) {
  const { transactions } = useStore();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 overflow-y-auto pb-20">
      <div className="bg-white rounded-lg w-full max-w-4xl my-4 mx-auto flex flex-col">
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b rounded-t-lg">
          <h2 className="text-lg font-medium">{format(selectedYear, 'yyyy')} Insights</h2>
          <button 
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          <MonthlyGraph transactions={transactions} selectedYear={selectedYear} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CategoryAnalysis transactions={transactions} />
            <PaymentMethodAnalysis transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}