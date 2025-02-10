import React, { useState } from 'react';
import { useStore } from '../../store';
import { Card } from '../common';
import { AppIconDialog } from './AppIconDialog';
import { Building2, User } from 'lucide-react';

export function AppInfoCard() {
  const [showDialog, setShowDialog] = useState(false);
  const { appIcon, userSettings } = useStore();

  return (
    <>
      <Card 
        className="bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 cursor-pointer transition-colors"
        onClick={() => setShowDialog(true)}
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg text-4xl">
            {appIcon?.emoji || <Building2 className="h-10 w-10 text-white" />}
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-blue-900">App Personalization</h2>
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-2 text-blue-800/70">
                <User className="h-4 w-4" />
                <span>{userSettings.name || 'Set your name'}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {showDialog && (
        <AppIconDialog onClose={() => setShowDialog(false)} />
      )}
    </>
  );
}