import React from 'react';
import { PlusCircle, Edit, Trash2, Calendar } from 'lucide-react';

export function RecordGuide() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h4 className="flex items-center gap-2 font-medium text-blue-900 mb-4">
          <PlusCircle className="h-5 w-5" />
          Adding New Transactions
        </h4>
        <ol className="list-decimal ml-5 space-y-2 text-gray-600">
          <li>Select Revenue or Expense type</li>
          <li>Choose the transaction date</li>
          <li>Enter the amount</li>
          <li>Add a description/memo</li>
          <li>Select a category</li>
          <li>Choose payment method</li>
          <li>Click Save to record</li>
        </ol>
      </div>

      <div className="bg-green-50 p-4 rounded-lg border border-green-100">
        <h4 className="flex items-center gap-2 font-medium text-green-900 mb-4">
          <Calendar className="h-5 w-5" />
          Daily View
        </h4>
        <ul className="list-disc ml-5 space-y-2 text-gray-600">
          <li>View all transactions for the selected date</li>
          <li>See daily totals for revenue and expenses</li>
          <li>Quick overview of transaction details</li>
        </ul>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
        <h4 className="flex items-center gap-2 font-medium text-purple-900 mb-4">
          <Edit className="h-5 w-5" />
          Managing Transactions
        </h4>
        <ul className="list-disc ml-5 space-y-2 text-gray-600">
          <li>Edit transactions by clicking the edit icon</li>
          <li>Update any transaction details</li>
          <li>Delete transactions using the trash icon</li>
          <li>View transaction history by date</li>
        </ul>
      </div>
    </div>
  );
}