import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import DraggableTicketCard from './DraggableTicketCard.jsx';
import { Circle, Plus } from 'lucide-react';

export default function TodoColumn({
  tickets = [],
  onAddTicket,
  canManage,
  onSelectTicket,
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'todo',
    data: { status: 'todo' },
  });

  const ticketIds = tickets.map((t) => t._id);

  return (
    <div
      ref={setNodeRef}
      className={`rounded-2xl p-3 flex flex-col transition-colors border ${
        isOver
          ? 'bg-white/80 border-dashed border-2 border-[#78716C] shadow-md'
          : 'bg-[#F5F1EC] border-[#D6D3D1]'
      }`}
    >
      {/* 3px Top bar indicator per DESIGN.md Section 8.2 */}
      <div className="h-1 bg-[#78716C] rounded-full mx-3 mb-2.5" />

      {/* Column Header */}
      <div className="flex items-center justify-between px-1 mb-3">
        <div className="flex items-center gap-2">
          <Circle className="w-4 h-4 text-[#78716C]" />
          <h3 className="text-sm font-bold text-[#292524]">To do</h3>
          <span className="w-5 h-5 rounded-full bg-white text-[#44403C] text-xs font-bold font-mono flex items-center justify-center shadow-xs">
            {tickets.length}
          </span>
        </div>

        {canManage && (
          <button
            type="button"
            onClick={() => onAddTicket && onAddTicket('todo')}
            className="w-7 h-7 rounded-full flex items-center justify-center text-[#78716C] hover:text-[#292524] hover:bg-white/60 transition-colors"
            title="Add ticket to To do"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Cards container */}
      <div className="flex-1 space-y-2.5 overflow-y-auto min-h-[140px] p-0.5">
        <SortableContext items={ticketIds} strategy={verticalListSortingStrategy}>
          {tickets.map((ticket) => (
            <DraggableTicketCard
              key={ticket._id}
              ticket={ticket}
              disabled={!canManage}
              onSelectTicket={onSelectTicket}
            />
          ))}
        </SortableContext>

        {/* Empty column state */}
        {tickets.length === 0 && !isOver && (
          <div className="h-32 rounded-xl border border-dashed border-[#A8A29E]/50 flex flex-col items-center justify-center text-center p-4">
            <p className="text-xs text-[#78716C] mb-2 font-medium">No tickets here yet</p>
            {canManage && (
              <button
                type="button"
                onClick={() => onAddTicket && onAddTicket('todo')}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-[#44403C] hover:bg-white/80 transition-colors"
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
