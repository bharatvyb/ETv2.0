import { TabProps } from '../types';

interface ExtendedTabProps extends TabProps {
  variant?: 'default' | 'success' | 'danger';
}

export function TabButton({ active, onClick, children, variant = 'default' }: ExtendedTabProps) {
  const getVariantClasses = () => {
    if (!active) return 'bg-white text-gray-700 hover:bg-gray-50';

    switch (variant) {
      case 'success':
        return 'bg-green-600 text-white shadow-sm hover:bg-green-700';
      case 'danger':
        return 'bg-red-600 text-white shadow-sm hover:bg-red-700';
      default:
        return 'bg-blue-600 text-white shadow-sm hover:bg-blue-700';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-3 text-sm font-medium rounded-xl transition-colors ${getVariantClasses()}`}
    >
      {children}
    </button>
  );
}