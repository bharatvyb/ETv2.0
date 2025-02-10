import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const INSTALL_SECTIONS = [
  {
    title: "What is a PWA?",
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">
          This Expense Tracker is a Progressive Web App (PWA), which means you can install it like a regular app on your device and use it offline. Benefits include:
        </p>
        <ul className="list-disc ml-5 space-y-2 text-gray-600">
          <li>Quick access from your home screen</li>
          <li>Works offline</li>
          <li>Faster loading times</li>
          <li>Regular updates automatically</li>
          <li>No app store required</li>
        </ul>
      </div>
    )
  },
  {
    title: "Android Installation",
    content: (
      <div className="space-y-4">
        <h4 className="font-medium text-blue-900 mb-3">Steps for Android:</h4>
        <ol className="list-decimal ml-5 space-y-2 text-gray-600">
          <li>Open Chrome browser</li>
          <li>Open the Expense Tracker App URL</li>
          <li>Tap the menu (⋮) in the top right</li>
          <li>Select "Install app" or "Add to Home screen"</li>
          <li>Follow the prompts to install</li>
        </ol>
        <div className="bg-blue-50 p-4 rounded-lg mt-4">
          <p className="text-blue-800 text-sm">
            💡 Tip: Look for the install prompt at the bottom of your screen
          </p>
        </div>
      </div>
    )
  },
  {
    title: "iOS Installation",
    content: (
      <div className="space-y-4">
        <h4 className="font-medium text-blue-900 mb-3">Steps for iPhone/iPad:</h4>
        <ol className="list-decimal ml-5 space-y-2 text-gray-600">
          <li>Open Safari browser</li>
          <li>Open the Expense Tracker App URL</li>
          <li>Tap the Share button (rectangle with arrow)</li>
          <li>Scroll down and tap "Add to Home Screen"</li>
          <li>Tap "Add" to confirm</li>
        </ol>
        <div className="bg-blue-50 p-4 rounded-lg mt-4">
          <p className="text-blue-800 text-sm">
            💡 Tip: The app will appear on your home screen like any other iOS app
          </p>
        </div>
      </div>
    )
  },
  {
    title: "Desktop Installation",
    content: (
      <div className="space-y-4">
        <h4 className="font-medium text-blue-900 mb-3">Steps for Desktop:</h4>
        <ol className="list-decimal ml-5 space-y-2 text-gray-600">
          <li>Open Chrome, Edge, or other modern browser</li>
          <li>Open the Expense Tracker App URL</li>
          <li>Look for the install icon (⊕) in the address bar</li>
          <li>Click "Install" in the prompt</li>
          <li>The app will open in its own window</li>
        </ol>
        <div className="bg-blue-50 p-4 rounded-lg mt-4">
          <p className="text-blue-800 text-sm">
            💡 Tip: You can also install via the browser's menu under "Install Expense Tracker"
          </p>
        </div>
      </div>
    )
  }
];

export function InstallGuide() {
  const [currentSection, setCurrentSection] = useState(0);

  const nextSection = () => {
    if (currentSection < INSTALL_SECTIONS.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-blue-900 mb-6">
            {INSTALL_SECTIONS[currentSection].title}
          </h3>
          {INSTALL_SECTIONS[currentSection].content}
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
            {currentSection + 1} of {INSTALL_SECTIONS.length}
          </div>

          <button
            onClick={nextSection}
            disabled={currentSection === INSTALL_SECTIONS.length - 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              currentSection === INSTALL_SECTIONS.length - 1
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