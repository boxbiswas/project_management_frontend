import React, { useState } from 'react';
import TicketCard from './TicketCard.jsx';
import { Plus, CheckCircle2, Circle, Loader, Layers } from 'lucide-react';

export default function TicketList({ tickets = [], onOpenCreateModal, canCreateTicket }) {
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredTickets = statusFilter === 'all'
    ? tickets
    : tickets.filter((t) => t.status === statusFilter);

  const todoCount = tickets.filter((t) => t.status === 'todo').length;
  const inProgressCount = tickets.filter((t) => t.status === 'in_progress').length;
  const doneCount = tickets.filter((t) => t.status === 'done').length;

  return (
    <div className="space-y-4">
      {/* List controls and status tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 border ${
              statusFilter === 'all'
                ? 'bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]'
                : 'bg-white text-[#78716C] border-[#E7D5BF] hover:bg-[#FFF7ED]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All ({tickets.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('todo')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 border ${
              statusFilter === 'todo'
                ? 'bg-[#F0EBE4] text-[#44403C] border-[#D6D3D1]'
                : 'bg-white text-[#78716C] border-[#E7D5BF] hover:bg-[#F5F1EC]'
            }`}
          >
            <Circle className="w-3 h-3 text-[#78716C]" />
            <span>To do ({todoCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('in_progress')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 border ${
              statusFilter === 'in_progress'
                ? 'bg-[#E0F2FE] text-[#075985] border-[#BAE6FD]'
                : 'bg-white text-[#78716C] border-[#E7D5BF] hover:bg-[#F0F9FF]'
            }`}
          >
            <Loader className="w-3 h-3 text-[#0EA5E9]" />
            <span>In progress ({inProgressCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('done')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 border ${
              statusFilter === 'done'
                ? 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]'
                : 'bg-white text-[#78716C] border-[#E7D5BF] hover:bg-[#F0FDF4]'
            }`}
          >
            <CheckCircle2 className="w-3 h-3 text-[#16A34A]" />
            <span>Done ({doneCount})</span>
          </button>
        </div>

        {canCreateTicket && (
          <button
            type="button"
            onClick={onOpenCreateModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-semibold transition-colors shadow-sm self-start sm:self-auto shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New ticket</span>
          </button>
        )}
      </div>

      {/* Empty State */}
      {filteredTickets.length === 0 && (
        <div className="py-14 px-4 bg-white rounded-2xl border border-[#F5E6D3] text-center max-w-sm mx-auto my-6 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-[#FFEDD5] text-[#F97316] flex items-center justify-center mx-auto mb-3.5">
            <Layers className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-[#292524] mb-1">
            {statusFilter === 'all' ? 'No tickets yet' : `No ${statusFilter.replace('_', ' ')} tickets`}
          </h3>
          <p className="text-xs text-[#78716C] mb-5 leading-relaxed">
            {statusFilter === 'all'
              ? 'Add a ticket to start tracking bugs, issues, and work items in this project.'
              : 'Try selecting a different status filter or create a new ticket.'}
          </p>
          {canCreateTicket && (
            <button
              type="button"
              onClick={onOpenCreateModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-semibold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New ticket</span>
            </button>
          )}
        </div>
      )}

      {/* Ticket Grid */}
      {filteredTickets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTickets.map((ticket) => (
            <TicketCard key={ticket._id} ticket={ticket} />
          ))}
        </div>
      )}
    </div>
  );
}
