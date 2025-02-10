import React from 'react';
import { TrendingUp, BarChart2, Calendar } from 'lucide-react';

export function TotalGuide() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h4 className="flex items-center gap-2 font-medium text-blue-900 mb-4">
          <TrendingUp className="h-5 w-5" />
          Yearly Overview
        </h4>
        <ul className="list-disc ml-5 space-y-2 text-gray-600">
          <li>View annual financial summary</li>
          <li>Track yearly revenue and expenses</li>
          <li>See total balance for the year</li>
          <li>Compare different years</li>
        </ul>
      </div>

      <div className="bg-green-50 p-4 rounded-lg border border-green-100">
        <h4 className="flex items-center gap-2 font-medium text-green-900 mb-4">
          <BarChart2 className="h-5 w-5" />
          Trends & Analysis
        </h4>
        <ul className="list-disc ml-5 space-y-2 text-gray-600">
          <li>View monthly trends throughout the year</li>
          <li>Analyze spending patterns</li>
          <li>Track category-wise yearly totals</li>
          <li>Compare different time periods</li>
        </ul>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
        <h4 className="flex items-center gap-2 font-medium text-purple-900 mb-4">
          <Calendar className="h-5 w-5" />
          Monthly Breakdown
        </h4>
        <ul className="list-disc ml-5 space-y-2 text-gray-600">
          <li>Quick access to any month's details</li>
          <li>Compare months side by side</li>
          <li>Track monthly progress</li>
          <li>Identify spending patterns</li>
        </ul>
      </div>
    </div>
  );
}