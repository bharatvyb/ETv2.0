import React, { useState } from 'react';
import { useStore } from '../store';
import { HelpCircle, Building2 } from 'lucide-react';
import { GuideDialog } from './guide/GuideDialog';

export function Header() {
  const { appIcon, userSettings } = useStore();
  const [showGuide, setShowGuide] = useState(false);
  
  return (
    <>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">
                {appIcon?.emoji || <Building2 className="h-8 w-8 text-gray-600" />}
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  BharatVyb
                </h1>
                <p className="text-sm text-gray-600">
                  {userSettings.name ? `Welcome, ${userSettings.name}` : 'Hello There!'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowGuide(true)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
              title="App Guide"
            >
              <HelpCircle className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {showGuide && <GuideDialog onClose={() => setShowGuide(false)} />}
    </>
  );
}