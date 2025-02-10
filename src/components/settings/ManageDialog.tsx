import React, { useState } from 'react';
import { X, Plus, Star, Pencil } from 'lucide-react';
import { useStore } from '../../store';
import { Category, PaymentMethod } from '../../types';

interface ManageDialogProps {
  type: 'categories' | 'methods';
  onClose: () => void;
}

export function ManageDialog({ type, onClose }: ManageDialogProps) {
  const {
    categories,
    paymentMethods,
    addCategory,
    updateCategory,
    deleteCategory,
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod
  } = useStore();

  const [newName, setNewName] = useState('');
  const [editingItem, setEditingItem] = useState<Category | PaymentMethod | null>(null);

  const items = type === 'categories' ? categories : paymentMethods;
  const addItem = type === 'categories' ? addCategory : addPaymentMethod;
  const updateItem = type === 'categories' ? updateCategory : updatePaymentMethod;
  const deleteItem = type === 'categories' ? deleteCategory : deletePaymentMethod;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      if (editingItem) {
        updateItem({ ...editingItem, name: newName.trim() });
        setEditingItem(null);
      } else {
        addItem(newName.trim());
      }
      setNewName('');
    }
  };

  const handleEdit = (item: Category | PaymentMethod) => {
    setEditingItem(item);
    setNewName(item.name);
  };

  const toggleDefault = (item: Category | PaymentMethod) => {
    // Remove default from all other items
    items.forEach(i => {
      if (i.id !== item.id && i.isDefault) {
        updateItem({ ...i, isDefault: false });
      }
    });
    // Set this item as default
    updateItem({ ...item, isDefault: !item.isDefault });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">
            Manage {type === 'categories' ? 'Categories' : 'Payment Methods'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4">
          <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder={editingItem ? "Edit name" : `New ${type === 'categories' ? 'category' : 'payment method'} name`}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {editingItem ? <Pencil className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            </button>
          </form>

          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-200/50 hover:shadow-md transition-shadow"
              >
                <span className="font-medium">{item.name}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleDefault(item)}
                    className={`p-1 transition-colors ${
                      item.isDefault ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                    }`}
                  >
                    <Star className="h-5 w-5" fill={item.isDefault ? "currentColor" : "none"} />
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  {!item.isDefault && (
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}