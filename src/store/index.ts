import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Transaction, Category, PaymentMethod, AppIcon, UserSettings } from '../types';

interface State {
  transactions: Transaction[];
  categories: Category[];
  paymentMethods: PaymentMethod[];
  appIcon: AppIcon | null;
  userSettings: UserSettings;
}

interface Actions {
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
  updateUserSettings: (settings: Partial<UserSettings>) => void;
  clearAllData: () => void;
  resetToDefaultCategories: () => void;
  resetToDefaultPaymentMethods: () => void;
}

const DEFAULT_CATEGORIES: Category[] = [
  { id: uuidv4(), name: 'Food & Drinks', order: 0, isDefault: true },
  { id: uuidv4(), name: 'Shopping', order: 1, isDefault: false },
  { id: uuidv4(), name: 'Housing', order: 2, isDefault: false },
  { id: uuidv4(), name: 'Transportation', order: 3, isDefault: false },
  { id: uuidv4(), name: 'Entertainment', order: 4, isDefault: false }
];

const DEFAULT_PAYMENT_METHODS: PaymentMethod[] = [
  { id: uuidv4(), name: 'Cash', order: 0, isDefault: true },
  { id: uuidv4(), name: 'Credit Card', order: 1, isDefault: false },
  { id: uuidv4(), name: 'Debit Card', order: 2, isDefault: false },
  { id: uuidv4(), name: 'Bank Transfer', order: 3, isDefault: false }
];

export const useStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      transactions: [],
      categories: DEFAULT_CATEGORIES,
      paymentMethods: DEFAULT_PAYMENT_METHODS,
      appIcon: null,
      userSettings: {
        name: '',
        currency: 'INR'
      },

      addTransaction: (transaction) => set((state) => ({
        transactions: [...state.transactions, { ...transaction, id: uuidv4() }]
      })),

      updateTransaction: (transaction) => set((state) => ({
        transactions: state.transactions.map((t) => 
          t.id === transaction.id ? transaction : t
        )
      })),

      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id)
      })),

      addCategory: (name) => set((state) => ({
        categories: [...state.categories, {
          id: uuidv4(),
          name,
          order: state.categories.length,
          isDefault: state.categories.length === 0
        }]
      })),

      updateCategory: (category) => set((state) => ({
        categories: state.categories.map((c) => 
          c.id === category.id ? category : c
        )
      })),

      deleteCategory: (id) => {
        const state = get();
        const category = state.categories.find((c) => c.id === id);
        if (category?.isDefault) return false;
        
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id)
        }));
        return true;
      },

      addPaymentMethod: (name) => set((state) => ({
        paymentMethods: [...state.paymentMethods, {
          id: uuidv4(),
          name,
          order: state.paymentMethods.length,
          isDefault: state.paymentMethods.length === 0
        }]
      })),

      updatePaymentMethod: (method) => set((state) => ({
        paymentMethods: state.paymentMethods.map((m) => 
          m.id === method.id ? method : m
        )
      })),

      deletePaymentMethod: (id) => {
        const state = get();
        const method = state.paymentMethods.find((m) => m.id === id);
        if (method?.isDefault) return false;
        
        set((state) => ({
          paymentMethods: state.paymentMethods.filter((m) => m.id !== id)
        }));
        return true;
      },

      getCategoryName: (id) => {
        const category = get().categories.find((c) => c.id === id);
        return category?.name || 'Unknown Category';
      },

      getPaymentMethodName: (id) => {
        const method = get().paymentMethods.find((m) => m.id === id);
        return method?.name || 'Unknown Method';
      },

      setAppIcon: (icon) => {
        set({ appIcon: icon });
        
        document.title = `${icon.emoji} BharatVyb`;
        
        let favicon = document.querySelector('link[rel="icon"]');
        if (!favicon) {
          favicon = document.createElement('link');
          favicon.rel = 'icon';
          document.head.appendChild(favicon);
        }
        favicon.href = icon.icon192;

        let appleIcon = document.querySelector('link[rel="apple-touch-icon"]');
        if (!appleIcon) {
          appleIcon = document.createElement('link');
          appleIcon.rel = 'apple-touch-icon';
          document.head.appendChild(appleIcon);
        }
        appleIcon.href = icon.icon192;
      },

      updateUserSettings: (settings) => set((state) => ({
        userSettings: { ...state.userSettings, ...settings }
      })),

      clearAllData: () => set({ transactions: [] }),

      resetToDefaultCategories: () => set({ categories: DEFAULT_CATEGORIES }),

      resetToDefaultPaymentMethods: () => set({ paymentMethods: DEFAULT_PAYMENT_METHODS })
    }),
    {
      name: 'expense-tracker-storage'
    }
  )
);