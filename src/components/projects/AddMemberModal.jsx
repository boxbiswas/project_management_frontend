import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProjectMember } from '../../redux/slices/projectSlice.js';
import { X, Loader2, UserPlus } from 'lucide-react';

export default function AddMemberModal({ isOpen, onClose, projectId }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [role, setRole] = useState('developer');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email address is required');
      return;
    }

    setSubmitting(true);
    setError('');

    const result = await dispatch(
      addProjectMember({
        projectId,
        memberData: {
          email: email.trim().toLowerCase(),
          role,
        },
      })
    );

    setSubmitting(false);

    if (addProjectMember.fulfilled.match(result)) {
      setEmail('');
      setRole('developer');
      onClose();
    } else {
      setError(result.payload || 'Failed to add member');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-[#292524]/45 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-[460px] bg-white rounded-2xl border border-[#F5E6D3] p-6 sm:p-7 shadow-[0_20px_40px_rgba(124,45,18,0.16)] z-10">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFEDD5] text-[#9A3412] flex items-center justify-center">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#292524] tracking-tight">Add team member</h2>
              <p className="text-xs text-[#78716C] mt-0.5">Add an existing registered user to this project</p>
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
          <div>
            <label className="block text-sm font-semibold text-[#292524] mb-1.5" htmlFor="member-email">
              Member email address
            </label>
            <input
              id="member-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              placeholder="colleague@example.com"
              className="w-full h-11 px-3.5 rounded-xl border border-[#E7D5BF] bg-white text-sm text-[#292524] placeholder-[#A8A29E] focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#292524] mb-1.5" htmlFor="member-role">
              Project role
            </label>
            <select
              id="member-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl border border-[#E7D5BF] bg-white text-sm text-[#292524] focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]"
            >
              <option value="developer">Developer — Can create, edit, and move tickets</option>
              <option value="manager">Manager — Can manage tickets and team members</option>
              <option value="admin">Admin — Full project management and deletion</option>
              <option value="viewer">Viewer — Read-only access</option>
            </select>
          </div>

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
                  <span>Adding...</span>
                </>
              ) : (
                'Add member'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
