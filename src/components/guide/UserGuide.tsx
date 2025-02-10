import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { RecordGuide } from './sections/RecordGuide';
import { MonthlyGuide } from './sections/MonthlyGuide';
import { TotalGuide } from './sections/TotalGuide';
import { SettingsGuide } from './sections/SettingsGuide';

const GUIDE_SECTIONS = [
  {
    id: 'record',
    title: 'Recording Transactions',
    component: RecordGuide
  },
  {
    id: 'monthly',
    title: 'Monthly Overview',
    component: MonthlyGuide
  },
  {
    id: 'total',
    title: 'Yearly Analysis',
    component: TotalGuide
  },
  {
    id: 'settings',
    title: 'Settings & Customization',
    component: SettingsGuide
  }
];

export function UserGuide() {
  const [currentSection, setCurrentSection] = useState(0);

  const nextSection = () => {
    if (currentSection < GUIDE_SECTIONS.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const CurrentComponent = GUIDE_SECTIONS[currentSection].component;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-blue-900 mb-6">
            {GUIDE_SECTIONS[currentSection].title}
          </h3>
          <CurrentComponent />
        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t p-4">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <button
            onClick={prevSection}
            disabled={currentSection === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              currentSection === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:bg-blue-50'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
            Previous
          </button>

          <div className="text-sm text-gray-500">
            {currentSection + 1} of {GUIDE_SECTIONS.length}
          </div>

          <button
            onClick={nextSection}
            disabled={currentSection === GUIDE_SECTIONS.length - 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              currentSection === GUIDE_SECTIONS.length - 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:bg-blue-50'
            }`}
          >
            Next
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}