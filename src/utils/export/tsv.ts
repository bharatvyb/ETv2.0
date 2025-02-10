import { Transaction } from '../../types';
import { useStore } from '../../store';
import { format } from 'date-fns';

export function exportToTSV(transactions: Transaction[]): string {
  try {
    const store = useStore.getState();
    const headers = ['Date', 'Amount', 'Memo', 'Category', 'Method', 'Type'];
    
    // Sort transactions by date
    const sortedTransactions = [...transactions].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Transaction rows
    const transactionRows = sortedTransactions.map(transaction => [
      transaction.date,
      transaction.amount.toString(),
      transaction.memo,
      store.getCategoryName(transaction.category),
      store.getPaymentMethodName(transaction.paymentMethod),
      transaction.type
    ]);

    // Build TSV content
    const lines = [
      // Headers and transactions
      headers.join('\t'),
      ...transactionRows.map(row => row.join('\t')),
      '', // Empty line separator
      // Categories section
      'Categories:',
      store.categories.map(c => c.name).join('\t'),
      '', // Empty line separator
      // Payment Methods section
      'Payment Methods:',
      store.paymentMethods.map(m => m.name).join('\t')
    ];

    return lines.join('\n');
  } catch (error) {
    console.error('Export error:', error);
    throw new Error('Failed to export data. Please try again.');
  }
}

export function getExportFileName(): string {
  return `expense-tracker-${format(new Date(), "yyyy-MM-dd-HHmmss")}.tsv`;
}