import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../common';

interface ImportConfirmDialogProps {
  onConfirm: (mergeExisting: boolean) => void;
  onClose: () => void;
}

export function ImportConfirmDialog({ onConfirm, onClose }: ImportConfirmDialogProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">Import Data</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <p className="text-gray-600">
            How would you like to handle existing categories and payment methods?
          </p>

          <div className="space-y-3">
            <Button
              variant="primary"
              className="w-full"
              onClick={() => onConfirm(true)}
            >
              Merge with existing values
            </Button>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => onConfirm(false)}
            >
              Replace with imported values
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}