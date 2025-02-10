import React from 'react';
import { Calendar, Search, PieChart, Filter } from 'lucide-react';

export function MonthlyGuide() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h4 className="flex items-center gap-2 font-medium text-blue-900 mb-4">
          <Calendar className="h-5 w-5" />
          Monthly Overview
        </h4>
        <ul className="list-disc ml-5 space-y-2 text-gray-600">
          <li>View all transactions for the selected month</li>
          <li>See monthly totals and balance</li>
          <li>Browse transactions by date</li>
          <li>Track monthly spending patterns</li>
        </ul>
      </div>

      <div className="bg-green-50 p-4 rounded-lg border border-green-100">
        <h4 className="flex items-center gap-2 font-medium text-green-900 mb-4">
          <Search className="h-5 w-5" />
          Search & Filter
        </h4>
        <ul className="list-disc ml-5 space-y-2 text-gray-600">
          <li>Search transactions by description</li>
          <li>Filter by category or payment method</li>
          <li>Sort transactions by date or amount</li>
          <li>Quick access to specific transactions</li>
        </ul>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
        <h4 className="flex items-center gap-2 font-medium text-purple-900 mb-4">
          <PieChart className="h-5 w-5" />
          Analysis & Reports
        </h4>
        <ul className="list-disc ml-5 space-y-2 text-gray-600">
          <li>View category-wise breakdown</li>
          <li>Track spending by payment method</li>
          <li>Compare revenue vs expenses</li>
          <li>Analyze monthly trends</li>
        </ul>
      </div>
    </div>
  );
}