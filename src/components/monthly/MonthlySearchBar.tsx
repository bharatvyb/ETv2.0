import React from 'react';
import { TransactionSearch } from '../TransactionSearch';
import { TransactionSummary } from '../TransactionSummary';
import { Transaction } from '../../types';

interface MonthlySearchBarProps {
  transactions: Transaction[];
  onFilter: (transactions: Transaction[]) => void;
  onSummaryClick: () => void;
}

export function MonthlySearchBar({ transactions, onFilter, onSummaryClick }: MonthlySearchBarProps) {
  return (
    <div className="space-y-4">
      <TransactionSummary 
        transactions={transactions}
        title="Monthly Summary"
        onClick={onSummaryClick}
      />
      
      <TransactionSearch 
        transactions={transactions}
        onFilter={onFilter}
      />
    </div>
  );
}