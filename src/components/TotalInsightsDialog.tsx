import React from 'react';
import { Transaction } from '../types';
import { formatCurrency } from '../utils/currency';
import { X } from 'lucide-react';
import { Card } from './common/Card';
import { format, parseISO, startOfYear, endOfYear, eachMonthOfInterval } from 'date-fns';

interface TotalInsightsDialogProps {
  transactions: Transaction[];
  selectedYear: Date;
  onClose: () => void;
}

export function TotalInsightsDialog({ transactions, selectedYear, onClose }: TotalInsightsDialogProps) {
  // Calculate monthly data for the graph
  const yearStart = startOfYear(selectedYear);
  const yearEnd = endOfYear(selectedYear);
  const monthsInYear = eachMonthOfInterval({ start: yearStart, end: yearEnd });
  
  const monthlyData = monthsInYear.map(month => {
    const monthTransactions = transactions.filter(t => 
      format(parseISO(t.date), 'yyyy-MM') === format(month, 'yyyy-MM')
    );
    
    return {
      month: format(month, 'MMM'),
      revenue: monthTransactions
        .filter(t => t.type === 'revenue')
        .reduce((sum, t) => sum + t.amount, 0),
      expenses: monthTransactions
        .filter(t => t.type === 'outgo')
        .reduce((sum, t) => sum + t.amount, 0)
    };
  });

  // Find max value for graph scaling
  const maxValue = Math.max(
    ...monthlyData.map(d => Math.max(d.revenue, d.expenses))
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">Yearly Insights {format(selectedYear, 'yyyy')}</h2>
          <button 
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 overflow-auto">
          <Card className="mb-4">
            <h3 className="text-lg font-medium mb-4">Monthly Revenue vs Expenses</h3>
            <div className="relative h-64">
              {/* Graph */}
              <div className="absolute inset-0 flex items-end justify-between gap-2">
                {monthlyData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col justify-end gap-1">
                    {/* Revenue Bar */}
                    <div 
                      className="bg-green-500 rounded-t w-full transition-all duration-300"
                      style={{ 
                        height: `${(data.revenue / maxValue) * 100}%`,
                        minHeight: data.revenue > 0 ? '2px' : '0'
                      }}
                      title={`Revenue: ${formatCurrency(data.revenue)}`}
                    />
                    {/* Expenses Bar */}
                    <div 
                      className="bg-red-500 rounded-t w-full transition-all duration-300"
                      style={{ 
                        height: `${(data.expenses / maxValue) * 100}%`,
                        minHeight: data.expenses > 0 ? '2px' : '0'
                      }}
                      title={`Expenses: ${formatCurrency(data.expenses)}`}
                    />
                    {/* Month Label */}
                    <div className="text-xs text-gray-600 text-center mt-2">
                      {data.month}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm text-gray-600">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-sm text-gray-600">Expenses</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}