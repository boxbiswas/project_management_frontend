import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import DraggableTicketCard from './DraggableTicketCard.jsx';
import { Clock, Plus } from 'lucide-react';

export default function InProgressColumn({ tickets = [], onAddTicket, canManage }) {
  // Droppable container hook for in-progress column
  const { setNodeRef, isOver } = useDroppable({
    id: 'in_progress',
    data: { status: 'in_progress' },
  });

  const ticketIds = tickets.map((t) => t._id);

  return (
    <div
      ref={setNodeRef}
      className={`rounded-2xl p-3 flex flex-col transition-colors border ${
        isOver
          ? 'bg-sky-50/80 border-dashed border-2 border-[#0284C7] shadow-md'
          : 'bg-[#F0F9FF] border-[#BAE6FD]'
      }`}
    >
      {/* Status top accent bar */}
      <div className="h-1 bg-[#0284C7] rounded-full mx-3 mb-2.5" />

      {/* Header section with icon, title, counter and add button */}
      <div className="flex items-center justify-between px-1 mb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#0284C7]" />
          <h3 className="text-sm font-bold text-[#0369A1]">In progress</h3>
          <span className="w-5 h-5 rounded-full bg-white text-[#0369A1] text-xs font-bold font-mono flex items-center justify-center shadow-xs">
            {tickets.length}
          </span>
        </div>

        {canManage && (
          <button
            type="button"
            onClick={() => onAddTicket && onAddTicket('in_progress')}
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#0284C7] hover:text-[#0369A1] hover:bg-white/60 transition-colors"
            title="Add ticket to In progress"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Sortable tickets container */}
      <div className="flex-1 space-y-2.5 overflow-y-auto min-h-[140px] p-0.5">
        <SortableContext items={ticketIds} strategy={verticalListSortingStrategy}>
          {tickets.map((ticket) => (
            <DraggableTicketCard key={ticket._id} ticket={ticket} disabled={!canManage} />
          ))}
        </SortableContext>

        {/* Empty column placeholder */}
        {tickets.length === 0 && !isOver && (
          <div className="h-32 rounded-xl border border-dashed border-[#7DD3FC]/60 flex flex-col items-center justify-center text-center p-4">
            <p className="text-xs text-[#0369A1]/70 mb-2 font-medium">No tickets in progress</p>
            {canManage && (
              <button
                type="button"
                onClick={() => onAddTicket && onAddTicket('in_progress')}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-[#0284C7] hover:bg-white/80 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add ticket</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
