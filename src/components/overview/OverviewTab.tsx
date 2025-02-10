import React, { useState } from 'react';
import { useStore } from '../../store';
import { CategoryOverview } from './CategoryOverview';
import { PaymentMethodOverview } from './PaymentMethodOverview';
import { MonthPicker } from '../MonthPicker';
import { TransactionSummary } from '../TransactionSummary';
import { format } from 'date-fns';

export function OverviewTab() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { transactions, categories, paymentMethods } = useStore();

  // Filter transactions for selected month
  const monthlyTransactions = transactions.filter(transaction => {
    const transactionMonth = format(new Date(transaction.date), 'yyyy-MM');
    const selectedMonth = format(selectedDate, 'yyyy-MM');
    return transactionMonth === selectedMonth;
  });

  // Add some test transactions if needed
  console.log('Monthly Transactions:', monthlyTransactions);
  console.log('Categories:', categories);
  console.log('Payment Methods:', paymentMethods);

  return (
    <div className="space-y-6">
      <MonthPicker selectedDate={selectedDate} onChange={setSelectedDate} />
      
      <TransactionSummary 
        transactions={monthlyTransactions} 
        title={`Summary for ${format(selectedDate, 'MMMM yyyy')}`}
      />

      <CategoryOverview 
        transactions={monthlyTransactions}
        categories={categories}
      />
      
      <PaymentMethodOverview 
        transactions={monthlyTransactions}
        paymentMethods={paymentMethods}
      />
    </div>
  );
}