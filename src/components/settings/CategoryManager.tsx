import React, { useState } from 'react';
import { ListPlus } from 'lucide-react';
import { Card } from '../common';
import { ManageDialog } from './ManageDialog';

export function CategoryManager() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Card 
        className="cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setShowDialog(true)}
      >
        <div className="flex items-center gap-3">
          <ListPlus className="h-5 w-5 text-blue-600" />
          <div>
            <h3 className="text-lg font-medium">Categories</h3>
            <p className="text-sm text-gray-600">Manage expense categories</p>
          </div>
        </div>
      </Card>

      {showDialog && (
        <ManageDialog 
          type="categories"
          onClose={() => setShowDialog(false)} 
        />
      )}
    </>
  );
}