import { CurrencyInfo } from '../types';

export const AVAILABLE_CURRENCIES: CurrencyInfo[] = [
  { id: '1', code: 'INR', name: 'Indian Rupee', symbol: '₹', isDefault: true },
  { id: '2', code: 'USD', name: 'US Dollar', symbol: '$', isDefault: false },
  { id: '3', code: 'EUR', name: 'Euro', symbol: '€', isDefault: false },
  { id: '4', code: 'GBP', name: 'British Pound', symbol: '£', isDefault: false },
  { id: '5', code: 'JPY', name: 'Japanese Yen', symbol: '¥', isDefault: false },
  { id: '6', code: 'CNY', name: 'Chinese Yuan', symbol: '¥', isDefault: false },
  { id: '7', code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', isDefault: false },
  { id: '8', code: 'AUD', name: 'Australian Dollar', symbol: 'A$', isDefault: false },
  { id: '9', code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', isDefault: false },
  { id: '10', code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', isDefault: false },
  { id: '11', code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', isDefault: false }
];