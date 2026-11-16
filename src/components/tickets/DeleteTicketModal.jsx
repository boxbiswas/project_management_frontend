import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTicket } from '../../redux/slices/ticketSlice.js';
import { Trash2, AlertTriangle, Loader2, X } from 'lucide-react';

export default function DeleteTicketModal({ isOpen, onClose, ticket, onDeleted }) {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !ticket) return null;

  const handleDelete = async () => {
    setSubmitting(true);
    setError('');

    const result = await dispatch(deleteTicket(ticket._id));
    setSubmitting(false);

    if (deleteTicket.fulfilled.match(result)) {
      if (onDeleted) onDeleted(ticket._id);
      onClose();
    } else {
      setError(result.payload || 'Failed to delete ticket. Check your permissions.');
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
      <div className="relative w-full max-w-[440px] bg-white rounded-2xl border border-red-100 p-6 shadow-[0_24px_50px_rgba(239,68,68,0.18)] z-10 space-y-4">
        {/* Header with warning icon and close */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#292524] tracking-tight">Delete Ticket</h3>
              <p className="text-xs text-[#78716C] mt-0.5">This action is permanent</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#78716C] hover:text-[#292524] hover:bg-[#FAF5EE]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Warning copy */}
        <div className="text-xs text-[#57534E] leading-relaxed bg-[#FAF5EE] p-3.5 rounded-xl border border-[#F5E6D3]">
          Are you sure you want to delete <strong className="text-[#292524]">&ldquo;{ticket.title}&rdquo;</strong>?
          All associated comments and activity history will be removed.
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="px-4 py-2 rounded-full border border-[#E7D5BF] bg-white text-xs font-semibold text-[#57534E] hover:bg-[#FAF5EE] transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={submitting}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white text-xs font-semibold transition-colors shadow-xs"
          >
            {submitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Ticket</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
