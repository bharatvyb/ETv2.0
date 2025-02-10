import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { AppInfoCard } from './AppInfoCard';
import { BackupRestoreCard } from './BackupRestoreCard';
import { CategoryManager } from './CategoryManager';
import { PaymentMethodManager } from './PaymentMethodManager';

const DEFAULT_CARD_ORDER = [
  { id: 'app-info', title: 'App Info', component: AppInfoCard },
  { id: 'backup', title: 'Backup', component: BackupRestoreCard },
  { id: 'categories', title: 'Categories', component: CategoryManager },
  { id: 'payment-methods', title: 'Payment Methods', component: PaymentMethodManager }
];

export function SettingsTab() {
  const [isReordering, setIsReordering] = useState(false);
  const [cardOrder, setCardOrder] = useState(DEFAULT_CARD_ORDER);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(cardOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCardOrder(items);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => setIsReordering(!isReordering)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            isReordering 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {isReordering ? 'Done' : 'Reorder Cards'}
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="settings-cards">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {cardOrder.map((card, index) => (
                <Draggable 
                  key={card.id} 
                  draggableId={card.id} 
                  index={index}
                  isDragDisabled={!isReordering}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`transition-all duration-200 ${
                        isReordering ? 'animate-jiggle cursor-move' : ''
                      } ${
                        snapshot.isDragging ? 'shadow-lg scale-105' : ''
                      }`}
                    >
                      <card.component />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}