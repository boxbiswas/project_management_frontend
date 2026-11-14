import React from 'react';
import {
  ArrowDown,
  ArrowUp,
  Minus,
  User,
  Calendar,
  GripVertical,
} from 'lucide-react';

export default function KanbanCard({ ticket, isGhost = false }) {
  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'high':
        return {
          label: 'High',
          badgeClass: 'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]',
          edgeClass: 'border-l-[#EF4444]',
          icon: <ArrowUp className="w-3 h-3 text-[#991B1B]" />,
        };
      case 'medium':
        return {
          label: 'Medium',
          badgeClass: 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]',
          edgeClass: 'border-l-[#FBBF24]',
          icon: <Minus className="w-3 h-3 text-[#92400E]" />,
        };
      case 'low':
      default:
        return {
          label: 'Low',
          badgeClass: 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]',
          edgeClass: 'border-l-[#4ADE80]',
          icon: <ArrowDown className="w-3 h-3 text-[#166534]" />,
        };
    }
  };

  const priorityConfig = getPriorityConfig(ticket.priority);

  const formattedDate = ticket.createdAt
    ? new Date(ticket.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : 'Recently';

  const getAssigneeInitials = (userObj) => {
    if (!userObj?.name) return 'U';
    const parts = userObj.name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  if (isGhost) {
    return (
      <div className="h-28 rounded-xl border-2 border-dashed border-[#FDBA74] bg-[#FFF7ED]/50 opacity-40 transition-all" />
    );
  }

  return (
    <div
      className={`group relative bg-white rounded-xl border border-[#F5E6D3] border-l-[3px] ${priorityConfig.edgeClass} p-3.5 shadow-[0_1px_3px_rgba(124,45,18,0.05),0_1px_2px_rgba(124,45,18,0.06)] hover:border-[#E7D5BF] hover:shadow-[0_6px_16px_rgba(124,45,18,0.10)] transition-all select-none`}
    >
      {/* Top row: Priority badge and drag grip */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${priorityConfig.badgeClass}`}
        >
          {priorityConfig.icon}
          <span>{priorityConfig.label}</span>
        </span>

        <GripVertical className="w-3.5 h-3.5 text-[#A8A29E] opacity-40 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Ticket title and description */}
      <h4 className="text-sm font-semibold text-[#292524] line-clamp-2 leading-snug">
        {ticket.title}
      </h4>
      {ticket.description && (
        <p className="text-xs text-[#78716C] line-clamp-2 mt-1 leading-relaxed">
          {ticket.description}
        </p>
      )}

      {/* Footer: Assignee avatar and date */}
      <div className="mt-3.5 pt-2.5 border-t border-[#F5E6D3] flex items-center justify-between text-xs text-[#78716C]">
        <div className="flex items-center gap-1.5 min-w-0">
          {ticket.assigneeId ? (
            <div className="flex items-center gap-1.5 truncate">
              <div
                className="w-5 h-5 rounded-full bg-[#FFEDD5] text-[#9A3412] font-bold text-[9px] flex items-center justify-center shrink-0 border border-[#FED7AA]"
                title={ticket.assigneeId.name}
              >
                {getAssigneeInitials(ticket.assigneeId)}
              </div>
              <span className="text-[11px] font-medium text-[#44403C] truncate">
                {ticket.assigneeId.name}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-[#A8A29E]">
              <div className="w-5 h-5 rounded-full border border-dashed border-[#A8A29E] flex items-center justify-center">
                <User className="w-2.5 h-2.5 text-[#A8A29E]" />
              </div>
              <span className="text-[11px] italic">Unassigned</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0 text-[#A8A29E] text-[11px]">
          <Calendar className="w-3 h-3 text-[#A8A29E]" />
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}
