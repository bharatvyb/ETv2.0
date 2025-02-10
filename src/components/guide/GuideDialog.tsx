import React, { useState } from 'react';
import { X, ChevronLeft, Book, Download } from 'lucide-react';
import { UserGuide } from './UserGuide';
import { InstallGuide } from './InstallGuide';

interface GuideDialogProps {
  onClose: () => void;
}

export function GuideDialog({ onClose }: GuideDialogProps) {
  const [activeGuide, setActiveGuide] = useState<'welcome' | 'user' | 'install'>('welcome');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">Help</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Back Navigation */}
        {activeGuide !== 'welcome' && (
          <div className="border-b px-4 py-2 bg-gray-50">
            <button
              onClick={() => setActiveGuide('welcome')}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <ChevronLeft className="h-5 w-5" />
              Back to guides
            </button>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {activeGuide === 'welcome' ? (
            <div className="p-6 space-y-6">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-blue-900">Welcome to BharatVyb Expense Tracker (V2.0.0)</h3>
                <p className="text-gray-600 max-w-lg mx-auto">
                  Your comprehensive financial companion that helps you track expenses, analyze spending patterns, and make better financial decisions.
                </p>
              </div>

              <div className="grid gap-4">
                <button
                  onClick={() => setActiveGuide('user')}
                  className="w-full p-6 text-left bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-blue-200 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <Book className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-lg font-semibold text-blue-900">User Guide</div>
                      <div className="text-sm text-blue-700/70 mt-1">
                        Learn how to record transactions, view monthly summaries, analyze yearly trends, and customize settings to match your needs.
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveGuide('install')}
                  className="w-full p-6 text-left bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 border border-purple-200 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <Download className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-lg font-semibold text-purple-900">Installation Guide</div>
                      <div className="text-sm text-purple-700/70 mt-1">
                        Install the app on your device for quick access and offline functionality. Available for Android, iOS, and desktop.
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            activeGuide === 'user' ? <UserGuide /> : <InstallGuide />
          )}
        </div>
      </div>
    </div>
  );
}