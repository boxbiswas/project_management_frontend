import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTicket } from '../../redux/slices/ticketSlice.js';
import { X, Loader2, PlusCircle } from 'lucide-react';

export default function CreateTicketModal({
  isOpen,
  onClose,
  projectId,
  projectMembers = [],
  initialStatus = 'todo',
}) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: initialStatus,
    assigneeId: '',
  });

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Sync initial status when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        status: initialStatus || 'todo',
      }));
    }
  }, [isOpen, initialStatus]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Ticket title is required');
      return;
    }

    setSubmitting(true);
    setError('');

    const payload = {
      projectId,
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority,
      status: formData.status,
      assigneeId: formData.assigneeId ? formData.assigneeId : null,
    };

    const result = await dispatch(createTicket(payload));
    setSubmitting(false);

    if (createTicket.fulfilled.match(result)) {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        status: 'todo',
        assigneeId: '',
      });
      onClose();
    } else {
      setError(result.payload || 'Failed to create ticket');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Modal backdrop */}
      <div
        className="fixed inset-0 bg-[#292524]/45 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal container */}
      <div className="relative w-full max-w-[560px] bg-white rounded-2xl border border-[#F5E6D3] p-6 sm:p-7 shadow-[0_20px_40px_rgba(124,45,18,0.16)] z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFEDD5] text-[#9A3412] flex items-center justify-center">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#292524] tracking-tight">Create ticket</h2>
              <p className="text-xs text-[#78716C] mt-0.5">Add a new issue, task, or bug to this project</p>
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

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Ticket Title */}
          <div>
            <label className="block text-sm font-semibold text-[#292524] mb-1.5" htmlFor="ticket-title">
              Ticket title
            </label>
            <input
              id="ticket-title"
              type="text"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                if (error) setError('');
              }}
              placeholder="e.g. Login fails on Safari 17"
              className="w-full h-11 px-3.5 rounded-xl border border-[#E7D5BF] bg-white text-sm text-[#292524] placeholder-[#A8A29E] focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-[#292524] mb-1.5" htmlFor="ticket-description">
              Description <span className="font-normal text-[#78716C]">(optional)</span>
            </label>
            <textarea
              id="ticket-description"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide reproduction steps or issue context"
              className="w-full p-3.5 rounded-xl border border-[#E7D5BF] bg-white text-sm text-[#292524] placeholder-[#A8A29E] focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]"
            />
          </div>

          {/* Priority & Status Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#292524] mb-1.5" htmlFor="ticket-priority">
                Priority
              </label>
              <select
                id="ticket-priority"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full h-11 px-3.5 rounded-xl border border-[#E7D5BF] bg-white text-sm text-[#292524] focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#292524] mb-1.5" htmlFor="ticket-status">
                Status
              </label>
              <select
                id="ticket-status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full h-11 px-3.5 rounded-xl border border-[#E7D5BF] bg-white text-sm text-[#292524] focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]"
              >
                <option value="todo">To do</option>
                <option value="in_progress">In progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          {/* Assignee Selection */}
          <div>
            <label className="block text-sm font-semibold text-[#292524] mb-1.5" htmlFor="ticket-assignee">
              Assignee
            </label>
            <select
              id="ticket-assignee"
              value={formData.assigneeId}
              onChange={(e) => setFormData({ ...formData, assigneeId: e.target.value })}
              className="w-full h-11 px-3.5 rounded-xl border border-[#E7D5BF] bg-white text-sm text-[#292524] focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]"
            >
              <option value="">Unassigned</option>
              {projectMembers.map((member) => {
                const memberUser = member.userId || member;
                return (
                  <option key={memberUser._id} value={memberUser._id}>
                    {memberUser.name} ({member.role || 'Member'})
                  </option>
                );
              })}
            </select>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 rounded-full border border-[#E7D5BF] text-sm font-semibold text-[#44403C] hover:bg-[#FFF7ED] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-sm font-semibold transition-colors disabled:bg-[#FDBA74]"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                'Create ticket'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
