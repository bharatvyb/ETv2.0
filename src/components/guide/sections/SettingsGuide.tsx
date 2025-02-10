import React from 'react';
import { Settings, DollarSign, Palette, RotateCcw, Download } from 'lucide-react';

export function SettingsGuide() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h4 className="flex items-center gap-2 font-medium text-blue-900 mb-4">
          <DollarSign className="h-5 w-5" />
          Default Currency
        </h4>
        <ul className="list-disc ml-5 space-y-2 text-gray-600">
          <li>Choose from multiple currencies (INR, USD, EUR, etc.)</li>
          <li>All transactions will display in selected currency</li>
          <li>Change currency anytime without losing data</li>
          <li>Currency format updates automatically</li>
        </ul>
      </div>

      <div className="bg-green-50 p-4 rounded-lg border border-green-100">
        <h4 className="flex items-center gap-2 font-medium text-green-900 mb-4">
          <Palette className="h-5 w-5" />
          App Icon & Appearance
        </h4>
        <ul className="list-disc ml-5 space-y-2 text-gray-600">
          <li>Choose from various app icons</li>
          <li>Customize app appearance</li>
          <li>Select emoji icons for better recognition</li>
          <li>Icon appears on home screen when installed</li>
        </ul>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
        <h4 className="flex items-center gap-2 font-medium text-purple-900 mb-4">
          <Download className="h-5 w-5" />
          Backup & Restore
        </h4>
        <ul className="list-disc ml-5 space-y-2 text-gray-600">
          <li>Export data as TSV file backup</li>
          <li>Import previous backups</li>
          <li>Merge or replace existing data</li>
          <li>Transfer data between devices</li>
        </ul>
      </div>

      <div className="bg-red-50 p-4 rounded-lg border border-red-100">
        <h4 className="flex items-center gap-2 font-medium text-red-900 mb-4">
          <RotateCcw className="h-5 w-5" />
          Reset App
        </h4>
        <ul className="list-disc ml-5 space-y-2 text-gray-600">
          <li>Clear all transactions if needed</li>
          <li>Reset to default categories</li>
          <li>Reset payment methods</li>
          <li>Start fresh with clean data</li>
          <li><span className="text-red-600 font-medium">Warning:</span> This action cannot be undone!</li>
        </ul>
      </div>
    </div>
  );
}