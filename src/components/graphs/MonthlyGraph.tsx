import React from 'react';
import { Transaction } from '../../types';
import { formatCurrency } from '../../utils/currency';
import { Card } from '../common/Card';
import { format, parseISO, startOfYear, endOfYear, eachMonthOfInterval } from 'date-fns';

interface MonthlyGraphProps {
  transactions: Transaction[];
  selectedYear: Date;
}

export function MonthlyGraph({ transactions, selectedYear }: MonthlyGraphProps) {
  // Calculate monthly data for the graph
  const yearStart = startOfYear(selectedYear);
  const yearEnd = endOfYear(selectedYear);
  const monthsInYear = eachMonthOfInterval({ start: yearStart, end: yearEnd });
  
  const monthlyData = monthsInYear.map(month => {
    const monthTransactions = transactions.filter(t => 
      format(parseISO(t.date), 'yyyy-MM') === format(month, 'yyyy-MM')
    );
    
    const revenue = monthTransactions
      .filter(t => t.type === 'revenue')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = monthTransactions
      .filter(t => t.type === 'outgo')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      month: format(month, 'MMM'),
      revenue,
      expenses,
      total: revenue - expenses,
      hasTransactions: revenue > 0 || expenses > 0
    };
  }).filter(data => data.hasTransactions);

  // Find max value for graph scaling
  const maxValue = Math.max(
    ...monthlyData.map(d => Math.max(d.revenue, d.expenses))
  );

  const totalRevenue = monthlyData.reduce((sum, d) => sum + d.revenue, 0);
  const totalExpenses = monthlyData.reduce((sum, d) => sum + d.expenses, 0);
  const totalBalance = totalRevenue - totalExpenses;

  return (
    <Card>
      <div className="space-y-6">
        <div className="flex justify-between items-baseline">
          <h3 className="text-lg font-medium">Monthly Revenue & Expenses</h3>
          <div className={`text-lg font-bold ${totalBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(totalBalance)}
          </div>
        </div>

        <div className="relative h-64">
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col-reverse">
                  {/* Stacked Bar */}
                  <div className="w-full relative" style={{ height: '200px' }}>
                    {/* Revenue Bar */}
                    <div 
                      className="absolute bottom-0 w-full bg-green-500 rounded-t transition-all duration-300"
                      style={{ 
                        height: `${(data.revenue / maxValue) * 100}%`,
                        minHeight: data.revenue > 0 ? '2px' : '0'
                      }}
                      title={`Revenue: ${formatCurrency(data.revenue)}`}
                    />
                    {/* Expenses Bar */}
                    <div 
                      className="absolute bottom-0 w-full bg-red-500 opacity-75 rounded-t transition-all duration-300"
                      style={{ 
                        height: `${(data.expenses / maxValue) * 100}%`,
                        minHeight: data.expenses > 0 ? '2px' : '0'
                      }}
                      title={`Expenses: ${formatCurrency(data.expenses)}`}
                    />
                  </div>
                </div>
                {/* Month Label */}
                <div className="text-xs text-gray-600 mt-2 whitespace-nowrap">
                  {data.month}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500">Total Revenue</div>
            <div className="font-medium text-green-600">{formatCurrency(totalRevenue)}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Total Expenses</div>
            <div className="font-medium text-red-600">{formatCurrency(totalExpenses)}</div>
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-sm text-gray-600">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 opacity-75 rounded-full" />
            <span className="text-sm text-gray-600">Expenses</span>
          </div>
        </div>
      </div>
    </Card>
  );
}