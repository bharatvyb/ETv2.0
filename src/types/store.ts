import { Transaction, Category, PaymentMethod, AppIcon, UserSettings } from './index';

export interface AppState {
  transactions: Transaction[];
  categories: Category[];
  paymentMethods: PaymentMethod[];
  appIcon: AppIcon | null;
  userSettings: UserSettings;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  addCategory: (name: string) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => boolean;
  addPaymentMethod: (name: string) => void;
  updatePaymentMethod: (method: PaymentMethod) => void;
  deletePaymentMethod: (id: string) => boolean;
  getCategoryName: (id: string) => string;
  getPaymentMethodName: (id: string) => string;
  setAppIcon: (icon: AppIcon) => void;
  setUserName: (name: string) => void;
  clearAllData: () => void;
  resetToDefaultCategories: () => void;
  resetToDefaultPaymentMethods: () => void;
}