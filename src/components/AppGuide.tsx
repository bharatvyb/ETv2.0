import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface GuideStep {
  title: string;
  content: React.ReactNode;
}

interface AppGuideProps {
  onClose: () => void;
}

const guideSteps: GuideStep[] = [
  {
    title: "Welcome to BharatVyb",
    content: (
      <div className="space-y-3">
        <p>Welcome to your personal expense tracking companion by BharatVyb AI Solutions! This guide will help you understand all the features available to manage your finances effectively.</p>
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-blue-800 text-sm">💡 Tip: You can access this guide anytime by clicking the help icon in the header.</p>
        </div>
        <div className="mt-4">
          <button
            onClick={() => document.querySelector('[data-step="6"]')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-blue-600 hover:text-blue-700 underline text-sm"
          >
            ➜ Learn how to install BharatVyb as an app
          </button>
        </div>
      </div>
    )
  },
  // ... other steps remain the same until the Install as App step
  {
    title: "Install as App",
    content: (
      <div className="space-y-4" data-step="6">
        <div>
          <h3 className="font-medium mb-2">What is a PWA?</h3>
          <p className="text-gray-600 mb-3">
            BharatVyb Expense Tracker is a Progressive Web App (PWA), which means you can install it like a regular app on your device and use it offline. It offers:
          </p>
          <ul className="list-disc ml-5 space-y-2 text-gray-600">
            <li>Quick access from your home screen</li>
            <li>Works offline</li>
            <li>Faster loading times</li>
            <li>Regular updates automatically</li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-2">Installation Guide</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-blue-600 mb-1">On Android:</h4>
              <ol className="list-decimal ml-5 space-y-1 text-gray-600">
                <li>Open Chrome browser</li>
                <li>Tap the menu (⋮) in the top right</li>
                <li>Select "Install app" or "Add to Home screen"</li>
                <li>Follow the prompts to install</li>
              </ol>
            </div>

            <div>
              <h4 className="text-sm font-medium text-blue-600 mb-1">On iPhone/iPad:</h4>
              <ol className="list-decimal ml-5 space-y-1 text-gray-600">
                <li>Open Safari browser</li>
                <li>Tap the Share button (rectangle with arrow)</li>
                <li>Scroll down and tap "Add to Home Screen"</li>
                <li>Tap "Add" to confirm</li>
              </ol>
            </div>

            <div>
              <h4 className="text-sm font-medium text-blue-600 mb-1">On Desktop Chrome:</h4>
              <ol className="list-decimal ml-5 space-y-1 text-gray-600">
                <li>Click the install icon (⊕) in the address bar</li>
                <li>Or use Chrome menu → Install BharatVyb</li>
                <li>Click "Install" in the prompt</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-blue-800 text-sm">
            💡 Tip: Once installed, you can launch BharatVyb directly from your device's home screen or app drawer, just like any other app!
          </p>
        </div>
      </div>
    )
  }
];

export function AppGuide({ onClose }: AppGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const goToNextStep = () => {
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">App Guide</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <h3 className="text-xl font-semibold mb-4">{guideSteps[currentStep].title}</h3>
          <div className="mb-8">{guideSteps[currentStep].content}</div>
        </div>

        <div className="border-t p-4 flex justify-between items-center bg-white">
          <button
            onClick={goToPreviousStep}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              currentStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:bg-blue-50'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
            Previous
          </button>

          <div className="text-sm text-gray-500">
            {currentStep + 1} of {guideSteps.length}
          </div>

          <button
            onClick={goToNextStep}
            disabled={currentStep === guideSteps.length - 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              currentStep === guideSteps.length - 1
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