import React, { useState } from 'react';
import { Card } from '../common';
import { User } from 'lucide-react';
import { useStore } from '../../store';

export function UserNameCard() {
  const { userSettings, setUserName } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userSettings.name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setUserName(name.trim());
      setIsEditing(false);
    }
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-4">
        <User className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-medium">User Name</h3>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setName(userSettings.name);
                setIsEditing(false);
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex justify-between items-center">
          <span className="text-gray-600">
            {userSettings.name || 'Not set'}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          >
            Edit
          </button>
        </div>
      )}
    </Card>
  );
}