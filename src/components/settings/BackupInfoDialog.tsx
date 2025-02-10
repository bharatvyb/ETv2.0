import React from 'react';
import { X } from 'lucide-react';

interface BackupInfoDialogProps {
  onClose: () => void;
}

export function BackupInfoDialog({ onClose }: BackupInfoDialogProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-[100] p-4 overflow-y-auto">
      <div className="relative bg-white rounded-lg w-full max-w-md my-8">
        <div className="sticky top-0 bg-white border-b z-10 rounded-t-lg">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-lg font-medium">About Backups</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto">
          <div>
            <h3 className="font-medium text-lg mb-2">Why Backup?</h3>
            <ul className="list-disc ml-5 space-y-2 text-gray-600">
              <li>This is a Progressive Web App (PWA) that stores data locally in your browser</li>
              <li>Data may be lost if you clear browser data/cache</li>
              <li>Regular backups help prevent data loss</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2">Backup Frequency</h3>
            <ul className="list-disc ml-5 space-y-2 text-gray-600">
              <li>Weekly backups recommended for regular users</li>
              <li>Daily backups if you add transactions frequently</li>
              <li>Always backup before clearing browser data</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-2">Important Notes</h3>
            <ul className="list-disc ml-5 space-y-2 text-gray-600">
              <li>Keep backup files in a safe location</li>
              <li>Consider cloud storage for additional safety</li>
              <li>Test restoring backups occasionally to ensure they work</li>
              <li>Backup before updating the app or switching devices</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800 text-sm">
              💡 Pro tip: Set a recurring calendar reminder for regular backups to ensure you never lose important financial data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}