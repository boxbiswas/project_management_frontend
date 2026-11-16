import React from 'react';
import {
  ArrowDown,
  ArrowUp,
  Minus,
  Circle,
  Loader,
  CheckCircle2,
  User,
  Calendar,
  MessageSquare,
} from 'lucide-react';

export default function TicketCard({ ticket, onClick }) {
  // Priority styling based on DESIGN.md (Section 3.4)
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

  // Status styling based on DESIGN.md (Section 3.3)
  const getStatusConfig = (status) => {
    switch (status) {
      case 'done':
        return {
          label: 'Done',
          badgeClass: 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]',
          icon: <CheckCircle2 className="w-3 h-3 text-[#16A34A]" />,
        };
      case 'in_progress':
        return {
          label: 'In progress',
          badgeClass: 'bg-[#E0F2FE] text-[#075985] border-[#BAE6FD]',
          icon: <Loader className="w-3 h-3 text-[#0EA5E9]" />,
        };
      case 'todo':
      default:
        return {
          label: 'To do',
          badgeClass: 'bg-[#F0EBE4] text-[#44403C] border-[#E7D5BF]',
          icon: <Circle className="w-3 h-3 text-[#78716C]" />,
        };
    }
  };

  const priorityConfig = getPriorityConfig(ticket.priority);
  const statusConfig = getStatusConfig(ticket.status);

  // Format created date
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

  return (
    <div
      onClick={onClick}
      className={`relative bg-white rounded-xl border border-[#F5E6D3] border-l-[3px] ${priorityConfig.edgeClass} p-4 shadow-[0_1px_3px_rgba(124,45,18,0.05),0_1px_2px_rgba(124,45,18,0.06)] hover:border-[#E7D5BF] hover:shadow-[0_6px_16px_rgba(124,45,18,0.10)] transition-all duration-150 flex flex-col justify-between ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      {/* Top row: Priority badge and Status badge */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${priorityConfig.badgeClass}`}
          >
            {priorityConfig.icon}
            <span>{priorityConfig.label}</span>
          </span>

          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusConfig.badgeClass}`}
          >
            {statusConfig.icon}
            <span>{statusConfig.label}</span>
          </span>
        </div>

        {/* Title and description */}
        <h3 className="text-sm font-semibold text-[#292524] line-clamp-2 leading-snug">
          {ticket.title}
        </h3>
        {ticket.description && (
          <p className="text-xs text-[#78716C] line-clamp-2 mt-1 leading-relaxed">
            {ticket.description}
          </p>
        )}
      </div>

      {/* Footer: Assignee avatar & name, comments, and created date */}
      <div className="mt-4 pt-3 border-t border-[#F5E6D3] flex items-center justify-between text-xs text-[#78716C]">
        <div className="flex items-center gap-2 min-w-0">
          {ticket.assigneeId ? (
            <div className="flex items-center gap-1.5 truncate">
              <div
                className="w-6 h-6 rounded-full bg-[#FFEDD5] text-[#9A3412] font-bold text-[10px] flex items-center justify-center shrink-0 border border-[#FED7AA]"
                title={ticket.assigneeId.name}
              >
                {getAssigneeInitials(ticket.assigneeId)}
              </div>
              <span className="font-medium text-[#44403C] truncate">
                {ticket.assigneeId.name}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-[#A8A29E]">
              <div className="w-6 h-6 rounded-full border border-dashed border-[#A8A29E] flex items-center justify-center">
                <User className="w-3 h-3 text-[#A8A29E]" />
              </div>
              <span className="italic">Unassigned</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-1 text-[#A8A29E] hover:text-[#EA580C] transition-colors"
            title="Comments & activity"
          >
            <MessageSquare className="w-3.5 h-3.5" />
          </div>

          <div className="flex items-center gap-1 shrink-0 text-[#78716C]" title="Created date">
            <Calendar className="w-3.5 h-3.5 text-[#A8A29E]" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
