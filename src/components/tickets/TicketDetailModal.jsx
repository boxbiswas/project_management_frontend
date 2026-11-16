import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTicket } from '../../redux/slices/ticketSlice.js';
import CommentSection from '../comments/CommentSection.jsx';
import EditTicketModal from './EditTicketModal.jsx';
import DeleteTicketModal from './DeleteTicketModal.jsx';
import {
  X,
  Calendar,
  User,
  ArrowUp,
  ArrowDown,
  Minus,
  CheckCircle2,
  Circle,
  Loader,
  Trash2,
  Edit2,
  Check,
} from 'lucide-react';

export default function TicketDetailModal({
  isOpen,
  onClose,
  ticket,
  projectMembers = [],
  canManage = true,
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [editedDesc, setEditedDesc] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  if (!isOpen || !ticket) return null;

  // Priority configuration helper
  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'high':
        return {
          label: 'High',
          badgeClass: 'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]',
          icon: <ArrowUp className="w-3.5 h-3.5 text-[#991B1B]" />,
        };
      case 'medium':
        return {
          label: 'Medium',
          badgeClass: 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]',
          icon: <Minus className="w-3.5 h-3.5 text-[#92400E]" />,
        };
      case 'low':
      default:
        return {
          label: 'Low',
          badgeClass: 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]',
          icon: <ArrowDown className="w-3.5 h-3.5 text-[#166534]" />,
        };
    }
  };

  const priorityConfig = getPriorityConfig(ticket.priority);

  // Status configuration helper
  const getStatusConfig = (status) => {
    switch (status) {
      case 'done':
        return {
          label: 'Done',
          badgeClass: 'bg-[#DCFCE7] text-[#166534] border-[#BBF7D0]',
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />,
        };
      case 'in_progress':
        return {
          label: 'In progress',
          badgeClass: 'bg-[#E0F2FE] text-[#075985] border-[#BAE6FD]',
          icon: <Loader className="w-3.5 h-3.5 text-[#0EA5E9]" />,
        };
      case 'todo':
      default:
        return {
          label: 'To do',
          badgeClass: 'bg-[#F0EBE4] text-[#44403C] border-[#E7D5BF]',
          icon: <Circle className="w-3.5 h-3.5 text-[#78716C]" />,
        };
    }
  };

  const statusConfig = getStatusConfig(ticket.status);

  // Handle status quick change
  const handleStatusChange = (newStatus) => {
    if (newStatus === ticket.status || !canManage) return;
    dispatch(updateTicket({ ticketId: ticket._id, data: { status: newStatus } }));
  };

  // Handle priority change
  const handlePriorityChange = (newPriority) => {
    if (newPriority === ticket.priority || !canManage) return;
    dispatch(updateTicket({ ticketId: ticket._id, data: { priority: newPriority } }));
  };

  // Handle assignee change
  const handleAssigneeChange = (newAssigneeId) => {
    if (!canManage) return;
    dispatch(
      updateTicket({
        ticketId: ticket._id,
        data: { assigneeId: newAssigneeId || null },
      })
    );
  };

  // Save edited title
  const handleSaveTitle = () => {
    if (editedTitle.trim() && editedTitle !== ticket.title) {
      dispatch(updateTicket({ ticketId: ticket._id, data: { title: editedTitle.trim() } }));
    }
    setIsEditingTitle(false);
  };

  // Save edited description
  const handleSaveDesc = () => {
    if (editedDesc !== ticket.description) {
      dispatch(updateTicket({ ticketId: ticket._id, data: { description: editedDesc.trim() } }));
    }
    setIsEditingDesc(false);
  };

  // Delete ticket confirmation
  const handleDeleteTicket = async () => {
    if (window.confirm('Are you sure you want to delete this ticket? This cannot be undone.')) {
      await dispatch(deleteTicket(ticket._id));
      onClose();
    }
  };

  // Format created date
  const formattedDate = ticket.createdAt
    ? new Date(ticket.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recently';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#292524]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl border border-[#F5E6D3] shadow-[0_24px_50px_rgba(124,45,18,0.2)] flex flex-col z-10 overflow-hidden">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-[#F5E6D3] flex items-center justify-between bg-[#FFFBF7]">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${statusConfig.badgeClass}`}
            >
              {statusConfig.icon}
              <span>{statusConfig.label}</span>
            </span>

            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${priorityConfig.badgeClass}`}
            >
              {priorityConfig.icon}
              <span>{priorityConfig.label}</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {canManage && (
              <>
                <button
                  type="button"
                  onClick={() => setEditModalOpen(true)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#78716C] hover:text-[#EA580C] hover:bg-[#FFF7ED] transition-colors"
                  title="Edit ticket"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteModalOpen(true)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#78716C] hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Delete ticket"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#78716C] hover:text-[#292524] hover:bg-[#F5E6D3]/50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Title row */}
          <div>
            {isEditingTitle ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="flex-1 px-3 py-1.5 text-lg font-bold text-[#292524] border border-[#F97316] rounded-xl focus:outline-hidden"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleSaveTitle}
                  className="p-2 rounded-xl bg-[#EA580C] text-white hover:bg-[#C2410C]"
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="group flex items-start justify-between gap-3">
                <h2 className="text-xl font-bold text-[#292524] tracking-tight leading-snug">
                  {ticket.title}
                </h2>
                {canManage && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditedTitle(ticket.title);
                      setIsEditingTitle(true);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-[#A8A29E] hover:text-[#292524] transition-all shrink-0"
                    title="Edit title"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Description row */}
          <div className="bg-[#FAF5EE] rounded-xl p-4 border border-[#F5E6D3]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-[#78716C] uppercase tracking-wider">
                Description
              </span>
              {canManage && !isEditingDesc && (
                <button
                  type="button"
                  onClick={() => {
                    setEditedDesc(ticket.description || '');
                    setIsEditingDesc(true);
                  }}
                  className="text-xs text-[#EA580C] hover:underline font-semibold"
                >
                  Edit
                </button>
              )}
            </div>

            {isEditingDesc ? (
              <div className="space-y-2 mt-2">
                <textarea
                  value={editedDesc}
                  onChange={(e) => setEditedDesc(e.target.value)}
                  rows={3}
                  className="w-full p-2.5 text-xs text-[#292524] bg-white border border-[#F97316] rounded-xl focus:outline-hidden leading-relaxed"
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingDesc(false)}
                    className="px-3 py-1 rounded-full text-xs font-semibold text-[#78716C] hover:bg-[#F5E6D3]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveDesc}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-[#EA580C] text-white hover:bg-[#C2410C]"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#44403C] leading-relaxed whitespace-pre-wrap">
                {ticket.description || 'No description provided.'}
              </p>
            )}
          </div>

          {/* Metadata Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-white rounded-xl border border-[#F5E6D3]">
            {/* Status Selector */}
            <div>
              <label className="text-[11px] font-bold text-[#78716C] block mb-1">Status</label>
              <select
                value={ticket.status}
                disabled={!canManage}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="w-full text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-[#E7D5BF] bg-[#FFFBF7] text-[#292524] focus:outline-hidden focus:border-[#F97316]"
              >
                <option value="todo">To do</option>
                <option value="in_progress">In progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            {/* Priority Selector */}
            <div>
              <label className="text-[11px] font-bold text-[#78716C] block mb-1">Priority</label>
              <select
                value={ticket.priority}
                disabled={!canManage}
                onChange={(e) => handlePriorityChange(e.target.value)}
                className="w-full text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-[#E7D5BF] bg-[#FFFBF7] text-[#292524] focus:outline-hidden focus:border-[#F97316]"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Assignee Selector */}
            <div>
              <label className="text-[11px] font-bold text-[#78716C] block mb-1">Assignee</label>
              <select
                value={ticket.assigneeId?._id || ticket.assigneeId || ''}
                disabled={!canManage}
                onChange={(e) => handleAssigneeChange(e.target.value)}
                className="w-full text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-[#E7D5BF] bg-[#FFFBF7] text-[#292524] focus:outline-hidden focus:border-[#F97316]"
              >
                <option value="">Unassigned</option>
                {projectMembers.map((m) => {
                  const mUser = m.userId || {};
                  return (
                    <option key={mUser._id || mUser.id} value={mUser._id || mUser.id}>
                      {mUser.name || mUser.email}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          {/* Ticket Information Bar */}
          <div className="flex flex-wrap items-center justify-between text-[11px] text-[#78716C] px-1">
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#A8A29E]" />
              <span>Created by:</span>
              <span className="font-semibold text-[#44403C]">
                {ticket.createdBy?.name || 'Team member'}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#A8A29E]" />
              <span>Created on:</span>
              <span className="font-semibold text-[#44403C]">{formattedDate}</span>
            </div>
          </div>

          {/* Comment Section under the ticket */}
          <div className="pt-2">
            <CommentSection
              ticketId={ticket._id}
              canComment={canManage}
              projectMembers={projectMembers}
            />
          </div>
        </div>
      </div>

      {/* Sub-modals for Editing and Deletion */}
      <EditTicketModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        ticket={ticket}
        projectMembers={projectMembers}
      />

      <DeleteTicketModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        ticket={ticket}
        onDeleted={() => {
          onClose();
        }}
      />
    </div>
  );
}
