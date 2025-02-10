import { v4 as uuidv4 } from 'uuid';
import { Transaction, TransactionType } from '../../types';
import { useStore } from '../../store';
import { generateEmojiIcon } from '../emoji';

interface ImportError {
  type: 'transaction' | 'category' | 'method' | 'settings';
  message: string;
  data?: any;
}

export async function parseTSV(content: string): Promise<{
  data: {
    transactions: any[];
    categories: string[];
    paymentMethods: string[];
    userSettings: Record<string, string>;
  };
  errors: ImportError[];
}> {
  const errors: ImportError[] = [];
  const result = {
    transactions: [],
    categories: [],
    paymentMethods: [],
    userSettings: {}
  };

  try {
    const lines = content.trim().split('\n');
    let currentSection: 'transactions' | 'categories' | 'methods' | 'settings' = 'transactions';
    let headers: string[] = [];

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) continue;

      if (trimmedLine === 'Categories:') {
        currentSection = 'categories';
        continue;
      } else if (trimmedLine === 'Payment Methods:') {
        currentSection = 'methods';
        continue;
      } else if (trimmedLine === 'User Settings:') {
        currentSection = 'settings';
        continue;
      }

      try {
        switch (currentSection) {
          case 'transactions':
            if (!headers.length) {
              headers = trimmedLine.split('\t');
            } else {
              const values = trimmedLine.split('\t');
              if (values.length === headers.length) {
                result.transactions.push({
                  date: values[0],
                  amount: values[1],
                  memo: values[2],
                  category: values[3],
                  method: values[4],
                  type: values[5].toLowerCase()
                });
              }
            }
            break;

          case 'categories':
            result.categories.push(...trimmedLine.split('\t').filter(Boolean));
            break;

          case 'methods':
            result.paymentMethods.push(...trimmedLine.split('\t').filter(Boolean));
            break;

          case 'settings':
            const [key, value] = trimmedLine.split('\t').map(s => s.trim());
            if (key && value) {
              result.userSettings[key.toLowerCase()] = value;
            }
            break;
        }
      } catch (error) {
        errors.push({
          type: currentSection,
          message: `Failed to parse ${currentSection} data`,
          data: trimmedLine
        });
      }
    }

    return { data: result, errors };
  } catch (error) {
    throw new Error('Invalid file format. Please ensure the file is a valid TSV export.');
  }
}

export async function transformTransactions(
  parsedData: any
): Promise<{ transactions: Transaction[]; errors: ImportError[] }> {
  const store = useStore.getState();
  const errors: ImportError[] = [];

  // Handle user settings
  if (parsedData.userSettings) {
    try {
      const settings = {
        name: parsedData.userSettings.name || '',
        currency: parsedData.userSettings.currency || 'INR'
      };
      store.updateUserSettings(settings);

      if (parsedData.userSettings['app icon']) {
        const icons = await generateEmojiIcon(parsedData.userSettings['app icon']);
        store.setAppIcon({ emoji: parsedData.userSettings['app icon'], ...icons });
      }
    } catch (error) {
      errors.push({
        type: 'settings',
        message: 'Failed to import some settings'
      });
    }
  }

  // Add new categories and payment methods
  try {
    parsedData.categories.forEach(name => {
      if (!store.categories.find(c => c.name.toLowerCase() === name.toLowerCase())) {
        store.addCategory(name);
      }
    });
  } catch (error) {
    errors.push({
      type: 'category',
      message: 'Failed to import some categories'
    });
  }

  try {
    parsedData.paymentMethods.forEach(name => {
      if (!store.paymentMethods.find(m => m.name.toLowerCase() === name.toLowerCase())) {
        store.addPaymentMethod(name);
      }
    });
  } catch (error) {
    errors.push({
      type: 'method',
      message: 'Failed to import some payment methods'
    });
  }

  // Transform transactions
  const transactions: Transaction[] = [];
  const existingKeys = new Set(
    store.transactions.map(t => `${t.date}-${t.amount}-${t.memo.toLowerCase()}-${t.type}`)
  );

  for (const raw of parsedData.transactions) {
    try {
      const transactionKey = `${raw.date}-${raw.amount}-${raw.memo.toLowerCase()}-${raw.type}`;
      
      if (existingKeys.has(transactionKey)) {
        continue;
      }

      const categoryId = store.categories.find(
        c => c.name.toLowerCase() === raw.category.toLowerCase()
      )?.id || store.categories[0].id;

      const methodId = store.paymentMethods.find(
        m => m.name.toLowerCase() === raw.method.toLowerCase()
      )?.id || store.paymentMethods[0].id;

      transactions.push({
        id: uuidv4(),
        date: raw.date,
        amount: parseFloat(raw.amount),
        memo: raw.memo,
        category: categoryId,
        paymentMethod: methodId,
        type: raw.type as TransactionType
      });
    } catch (error) {
      errors.push({
        type: 'transaction',
        message: 'Failed to import transaction',
        data: raw
      });
    }
  }

  return { transactions, errors };
}