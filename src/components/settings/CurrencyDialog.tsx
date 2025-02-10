import React from 'react';
import { X, Star } from 'lucide-react';
import { useStore } from '../../store';
import { AVAILABLE_CURRENCIES } from '../../utils/currencies';

interface CurrencyDialogProps {
  onClose: () => void;
}

export function CurrencyDialog({ onClose }: CurrencyDialogProps) {
  const { userSettings, updateUserSettings } = useStore();

  const handleCurrencySelect = (currencyCode: string) => {
    updateUserSettings({ currency: currencyCode });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">Select Currency</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4">
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {AVAILABLE_CURRENCIES.map((currencyInfo) => (
              <button
                key={currencyInfo.id}
                onClick={() => handleCurrencySelect(currencyInfo.code)}
                className="flex items-center justify-between w-full p-3 bg-white rounded-lg shadow-sm border border-gray-200/50 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{currencyInfo.symbol}</span>
                  <div className="text-left">
                    <div className="font-medium">{currencyInfo.name}</div>
                    <div className="text-sm text-gray-500">{currencyInfo.code}</div>
                  </div>
                </div>
                {userSettings.currency === currencyInfo.code && (
                  <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}