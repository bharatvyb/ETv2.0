import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = '', onClick }: CardProps) {
  const baseClasses = `
    bg-white rounded-2xl border border-gray-100/80
    shadow-sm hover:shadow-md
    transition-all duration-200
  `;
  
  const clickableClasses = onClick ? 'cursor-pointer active:scale-[0.99]' : '';
  
  return (
    <div 
      className={`${baseClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
    >
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}