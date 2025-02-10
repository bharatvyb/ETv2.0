import React from 'react';
import { format, addDays, subDays } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
}

export function DatePicker({ selectedDate, onChange }: DatePickerProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80">
      <div className="flex items-center justify-between p-4">
        <button
          onClick={() => onChange(subDays(selectedDate, 1))}
          className="p-2 hover:bg-gray-50 rounded-xl transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <h2 className="text-lg font-medium">
          {format(selectedDate, 'MMMM d, yyyy')}
        </h2>
        
        <button
          onClick={() => onChange(addDays(selectedDate, 1))}
          className="p-2 hover:bg-gray-50 rounded-xl transition-colors"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}