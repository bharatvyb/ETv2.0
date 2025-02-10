import React from 'react';
import { Home, Calendar, Clock, Settings } from 'lucide-react';
import { Header } from './Header';
import { WelcomeBanner } from './WelcomeBanner';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: number;
  onTabChange: (index: number) => void;
}

export function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  const tabs = [
    { icon: Home, label: 'Record' },
    { icon: Calendar, label: 'Monthly' },
    { icon: Clock, label: 'Total' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto bg-white min-h-screen flex flex-col relative">
        <Header />
        <WelcomeBanner />
        
        <main className="flex-1 p-4 pb-24">
          <div className="max-w-2xl mx-auto">
            {children}
          </div>
        </main>

        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-50 pb-safe">
          <div className="max-w-lg mx-auto px-4">
            <div className="flex justify-around -mb-0.5">
              {tabs.map((tab, index) => {
                const Icon = tab.icon;
                const isActive = activeTab === index;
                return (
                  <button
                    key={tab.label}
                    onClick={() => onTabChange(index)}
                    className={`
                      flex flex-col items-center py-3 px-3 relative
                      transition-colors duration-200
                      ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}
                    `}
                  >
                    {isActive && (
                      <div className="absolute -top-px left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                    )}
                    <Icon className={`h-6 w-6 ${isActive ? 'stroke-2' : 'stroke-1.5'}`} />
                    <span className={`text-xs mt-1 ${isActive ? 'font-medium' : ''}`}>
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}