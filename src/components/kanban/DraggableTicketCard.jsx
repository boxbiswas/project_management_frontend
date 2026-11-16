import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import KanbanCard from './KanbanCard.jsx';

export default function DraggableTicketCard({
  ticket,
  disabled = false,
  onSelectTicket,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: ticket._id,
    data: {
      ticket,
      status: ticket.status,
    },
    disabled,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`touch-manipulation ${disabled ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
    >
      <KanbanCard
        ticket={ticket}
        isGhost={isDragging}
        onClick={() => onSelectTicket && onSelectTicket(ticket)}
      />
    </div>
  );
}
