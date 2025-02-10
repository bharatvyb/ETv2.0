import React from 'react';
import { Transaction, Category, PaymentMethod } from '../../types';
import { MonthlySummaryContent } from './MonthlySummaryContent';

interface MonthlySummaryProps {
  transactions: Transaction[];
  categories: Category[];
  paymentMethods: PaymentMethod[];
  onCategoryClick: (categoryId: string) => void;
  onPaymentMethodClick: (methodId: string) => void;
}

export function MonthlySummary(props: MonthlySummaryProps) {
  return <MonthlySummaryContent {...props} />;
}