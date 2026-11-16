import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTicket } from '../../redux/slices/ticketSlice.js';
import { X, Loader2, Edit3, Save } from 'lucide-react';

export default function EditTicketModal({
  isOpen,
  onClose,
  ticket,
  projectMembers = [],
}) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    assigneeId: '',
  });

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Initialize form data when ticket changes or modal opens
  useEffect(() => {
    if (ticket && isOpen) {
      setFormData({
        title: ticket.title || '',
        description: ticket.description || '',
        priority: ticket.priority || 'medium',
        status: ticket.status || 'todo',
        assigneeId: ticket.assigneeId?._id || ticket.assigneeId || '',
      });
      setError('');
    }
  }, [ticket, isOpen]);

  if (!isOpen || !ticket) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError('Ticket title is required');
      return;
    }

    setSubmitting(true);
    setError('');

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      status: formData.status,
      assigneeId: formData.assigneeId ? formData.assigneeId : null,
    };

    const result = await dispatch(
      updateTicket({
        ticketId: ticket._id,
        data: payload,
      })
    );

    setSubmitting(false);

    if (updateTicket.fulfilled.match(result)) {
      onClose();
    } else {
      setError(result.payload || 'Failed to update ticket. Check your project permissions.');
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#292524]/55 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-[500px] bg-white rounded-2xl border border-[#F5E6D3] p-6 sm:p-7 shadow-[0_24px_50px_rgba(124,45,18,0.2)] z-10 space-y-5">
        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFEDD5] text-[#9A3412] flex items-center justify-center">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#292524] tracking-tight">Edit Ticket</h2>
              <p className="text-xs text-[#78716C] mt-0.5">Update ticket details and assignment</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#78716C] hover:text-[#292524] hover:bg-[#FFF7ED]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
            {error}
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-[#44403C] uppercase tracking-wider mb-1.5">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Broken authentication redirect on safari"
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7D5BF] bg-[#FFFBF7] text-[#292524] text-sm focus:outline-hidden focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 transition-all placeholder-[#A8A29E]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-[#44403C] uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide steps to reproduce or details..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E7D5BF] bg-[#FFFBF7] text-[#292524] text-sm focus:outline-hidden focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 transition-all placeholder-[#A8A29E] leading-relaxed"
            />
          </div>

          {/* Status and Priority selectors */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#44403C] uppercase tracking-wider mb-1.5">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#E7D5BF] bg-[#FFFBF7] text-[#292524] text-xs font-semibold focus:outline-hidden focus:border-[#F97316] cursor-pointer"
              >
                <option value="todo">To do</option>
                <option value="in_progress">In progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#44403C] uppercase tracking-wider mb-1.5">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-[#E7D5BF] bg-[#FFFBF7] text-[#292524] text-xs font-semibold focus:outline-hidden focus:border-[#F97316] cursor-pointer"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* Assignee */}
          <div>
            <label className="block text-xs font-bold text-[#44403C] uppercase tracking-wider mb-1.5">
              Assignee
            </label>
            <select
              value={formData.assigneeId}
              onChange={(e) => setFormData({ ...formData, assigneeId: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-[#E7D5BF] bg-[#FFFBF7] text-[#292524] text-xs font-semibold focus:outline-hidden focus:border-[#F97316] cursor-pointer"
            >
              <option value="">Unassigned</option>
              {projectMembers.map((member) => {
                const u = member.userId || {};
                return (
                  <option key={u._id || u.id} value={u._id || u.id}>
                    {u.name || u.email || 'Team Member'}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#F5E6D3]">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 rounded-full border border-[#E7D5BF] bg-white text-xs font-semibold text-[#57534E] hover:bg-[#FAF5EE] transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#EA580C] hover:bg-[#C2410C] disabled:bg-[#FED7AA] text-white text-xs font-semibold transition-colors shadow-xs"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
