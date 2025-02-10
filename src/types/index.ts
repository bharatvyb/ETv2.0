export interface UserSettings {
  name: string;
  currency: 'INR' | 'USD' | 'EUR' | 'GBP';
}

export type TransactionType = 'revenue' | 'outgo';

export interface Transaction {
  id: string;
  type: TransactionType;
  date: string;
  amount: number;
  memo: string;
  category: string;
  paymentMethod: string;
}

export interface Category {
  id: string;
  name: string;
  isDefault?: boolean;
  order: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  isDefault?: boolean;
  order: number;
}

export interface TabProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export interface AppIcon {
  emoji: string;
  icon192: string;
  icon512: string;
}