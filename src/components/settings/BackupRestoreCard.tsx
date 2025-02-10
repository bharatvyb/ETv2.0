import React, { useState } from 'react';
import { Download, Upload, Info } from 'lucide-react';
import { Card } from '../common';
import { useStore } from '../../store';
import { exportToTSV, getExportFileName } from '../../utils/export/tsv';
import { parseTSV, transformTransactions } from '../../utils/import/tsv';
import { ImportConfirmDialog } from './ImportConfirmDialog';
import { BackupInfoDialog } from './BackupInfoDialog';
import { ImportResultDialog } from './ImportResultDialog';

export function BackupRestoreCard() {
  const [importData, setImportData] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [importResult, setImportResult] = useState<{
    errors: any[];
    successCount: number;
  } | null>(null);

  const handleExport = () => {
    try {
      const { transactions } = useStore.getState();
      const tsvContent = exportToTSV(transactions);
      const blob = new Blob([tsvContent], { type: 'text/tab-separated-values' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = getExportFileName();
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      setError('Failed to export data. Please try again.');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (file) {
        if (!file.name.endsWith('.tsv')) {
          setError('Please select a valid TSV file exported from this app.');
          return;
        }
        const content = await file.text();
        setImportData(content);
      }
    } catch (error) {
      console.error('Failed to read file:', error);
      setError('Failed to read the file. Please try again.');
    }
  };

  const processImport = async (mergeExisting: boolean) => {
    try {
      if (!importData) return;

      // Parse the TSV data
      const { data, errors: parseErrors } = await parseTSV(importData);
      const store = useStore.getState();

      if (!mergeExisting) {
        store.clearAllData();
        store.resetToDefaultCategories();
        store.resetToDefaultPaymentMethods();
      }

      // Transform and add transactions
      const { transactions, errors: transformErrors } = await transformTransactions(data);
      transactions.forEach(transaction => {
        store.addTransaction(transaction);
      });

      // Show import results
      setImportResult({
        errors: [...parseErrors, ...transformErrors],
        successCount: transactions.length
      });

      setImportData(null);
    } catch (error) {
      console.error('Import failed:', error);
      setError('Failed to import data. Please ensure the file is valid.');
    }
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-medium">Backup & Restore</h3>
          <button
            onClick={() => setShowInfo(true)}
            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
            title="Backup Information"
          >
            <Info className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            Backup Data
          </button>
          
          <label className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors cursor-pointer">
            <Upload className="h-4 w-4" />
            Restore Data
            <input
              type="file"
              accept=".tsv"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}
      </Card>

      {importData && (
        <ImportConfirmDialog
          onConfirm={processImport}
          onClose={() => setImportData(null)}
        />
      )}

      {importResult && (
        <ImportResultDialog
          errors={importResult.errors}
          successCount={importResult.successCount}
          onClose={() => {
            setImportResult(null);
            window.location.reload();
          }}
        />
      )}

      {showInfo && (
        <BackupInfoDialog onClose={() => setShowInfo(false)} />
      )}
    </>
  );
}