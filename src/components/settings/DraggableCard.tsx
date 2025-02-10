import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { GripVertical } from 'lucide-react';

interface DraggableCardProps {
  id: string;
  index: number;
  isReordering: boolean;
  children: React.ReactNode;
}

export function DraggableCard({ id, index, isReordering, children }: DraggableCardProps) {
  return (
    <Draggable draggableId={id} index={index} isDragDisabled={!isReordering}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`relative transition-all duration-200 ${
            snapshot.isDragging ? 'shadow-lg scale-[1.02] z-50' : ''
          }`}
        >
          {isReordering && (
            <div
              {...provided.dragHandleProps}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 cursor-move"
            >
              <GripVertical className="h-5 w-5 text-gray-400" />
            </div>
          )}
          <div className={isReordering ? 'pl-10' : ''}>
            {children}
          </div>
        </div>
      )}
    </Draggable>
  );
}