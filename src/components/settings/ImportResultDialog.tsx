import React from 'react';
import { X, AlertCircle, CheckCircle } from 'lucide-react';

interface ImportError {
  type: string;
  message: string;
  data?: any;
}

interface ImportResultDialogProps {
  errors: ImportError[];
  successCount: number;
  onClose: () => void;
}

export function ImportResultDialog({ errors, successCount, onClose }: ImportResultDialogProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">Import Results</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Success Summary */}
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span>Successfully imported {successCount} transactions</span>
          </div>

          {/* Errors Section */}
          {errors.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="h-5 w-5" />
                <span>Some items could not be imported:</span>
              </div>
              
              <div className="bg-red-50 p-3 rounded-md space-y-2">
                {errors.map((error, index) => (
                  <div key={index} className="text-sm text-red-600">
                    <span className="font-medium">{error.type}:</span> {error.message}
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-600">
                Please fix these issues and try importing again, or continue with the successful imports.
              </p>
            </div>
          )}
        </div>

        <div className="border-t p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}