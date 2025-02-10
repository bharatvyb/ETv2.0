import React from 'react';
import { AppInfoCard } from '../components/settings/AppInfoCard';
import { BackupRestoreCard } from '../components/settings/BackupRestoreCard';
import { CategoryManager } from '../components/settings/CategoryManager';
import { PaymentMethodManager } from '../components/settings/PaymentMethodManager';
import { ResetAppCard } from '../components/settings/ResetAppCard';
import { CurrencySelector } from '../components/settings/CurrencySelector';
import { BrandingCard } from '../components/settings/BrandingCard';

export function SettingsTab() {
  return (
    <div className="space-y-4 pb-20">
      <AppInfoCard />
      <BackupRestoreCard />
      <CurrencySelector />
      <CategoryManager />
      <PaymentMethodManager />
      <ResetAppCard />
      <div className="mt-8">
        <BrandingCard />
      </div>
    </div>
  );
}