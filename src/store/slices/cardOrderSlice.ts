import { StateCreator } from 'zustand';
import { AppState } from '../types';

export interface SettingsCard {
  id: string;
  type: 'app-info' | 'backup' | 'currency' | 'categories' | 'payment-methods' | 'reset';
}

const DEFAULT_CARD_ORDER: SettingsCard[] = [
  { id: 'app-info', type: 'app-info' },
  { id: 'backup', type: 'backup' },
  { id: 'currency', type: 'currency' },
  { id: 'categories', type: 'categories' },
  { id: 'payment-methods', type: 'payment-methods' },
  { id: 'reset', type: 'reset' }
];

export interface CardOrderSlice {
  cardOrder: SettingsCard[];
  updateCardOrder: (newOrder: SettingsCard[]) => void;
  resetCardOrder: () => void;
}

export const createCardOrderSlice: StateCreator<AppState, [], [], CardOrderSlice> = (set) => ({
  cardOrder: DEFAULT_CARD_ORDER,
  updateCardOrder: (newOrder) => set({ cardOrder: newOrder }),
  resetCardOrder: () => set({ cardOrder: DEFAULT_CARD_ORDER })
});