import { useStore } from '../store';

const currencyConfig: Record<string, { locale: string; currency: string }> = {
  INR: { locale: 'en-IN', currency: 'INR' },
  USD: { locale: 'en-US', currency: 'USD' },
  EUR: { locale: 'de-DE', currency: 'EUR' },
  GBP: { locale: 'en-GB', currency: 'GBP' }
};

export const formatCurrency = (amount: number): string => {
  try {
    const { userSettings } = useStore.getState();
    if (!userSettings?.currency) {
      // Fallback to INR if no currency is set
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(amount);
    }

    const config = currencyConfig[userSettings.currency];
    if (!config) {
      // Fallback to INR if invalid currency
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(amount);
    }

    return new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: config.currency,
    }).format(amount);
  } catch (error) {
    console.error('Error formatting currency:', error);
    // Fallback to basic number formatting
    return amount.toLocaleString();
  }
};