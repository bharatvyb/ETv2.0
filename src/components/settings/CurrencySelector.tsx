import React, { useState } from 'react';
import { useStore } from '../../store';
import { DollarSign } from 'lucide-react';
import { Card } from '../common';
import { CurrencyDialog } from './CurrencyDialog';

export function CurrencySelector() {
  const [showDialog, setShowDialog] = useState(false);
  const { userSettings } = useStore();

  const getCurrencyLabel = () => {
    switch (userSettings.currency) {
      case 'INR': return 'Indian Rupee (₹)';
      case 'USD': return 'US Dollar ($)';
      case 'EUR': return 'Euro (€)';
      case 'GBP': return 'British Pound (£)';
      default: return 'Select Currency';
    }
  };

  return (
    <>
      <Card 
        className="cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setShowDialog(true)}
      >
        <div className="flex items-center gap-3">
          <DollarSign className="h-5 w-5 text-blue-600" />
          <div>
            <h3 className="text-lg font-medium">Currency</h3>
            <p className="text-sm text-gray-600">
              {getCurrencyLabel()}
            </p>
          </div>
        </div>
      </Card>

      {showDialog && (
        <CurrencyDialog onClose={() => setShowDialog(false)} />
      )}
    </>
  );
}