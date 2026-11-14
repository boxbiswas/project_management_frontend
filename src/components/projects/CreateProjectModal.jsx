import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProject } from '../../redux/slices/projectSlice.js';
import { X, Loader2 } from 'lucide-react';

export default function CreateProjectModal({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Project title is required');
      return;
    }

    setSubmitting(true);
    setError('');

    const result = await dispatch(
      createProject({
        title: formData.title.trim(),
        description: formData.description.trim(),
      })
    );

    setSubmitting(false);

    if (createProject.fulfilled.match(result)) {
      setFormData({ title: '', description: '' });
      onClose();
    } else {
      setError(result.payload || 'Failed to create project');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Modal backdrop */}
      <div
        className="fixed inset-0 bg-[#292524]/45 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div className="relative w-full max-w-[520px] bg-white rounded-2xl border border-[#F5E6D3] p-6 sm:p-7 shadow-[0_20px_40px_rgba(124,45,18,0.16)] z-10">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-[#292524] tracking-tight">Create project</h2>
            <p className="text-sm text-[#78716C] mt-0.5">Projects hold your team and tickets</p>
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
            <label className="block text-sm font-semibold text-[#292524] mb-1.5" htmlFor="title">
              Project title
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                if (error) setError('');
              }}
              placeholder="e.g. Payments API Revamp"
              className="w-full h-11 px-3.5 rounded-xl border border-[#E7D5BF] bg-white text-sm text-[#292524] placeholder-[#A8A29E] focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#292524] mb-1.5" htmlFor="description">
              Description <span className="font-normal text-[#78716C]">(optional)</span>
            </label>
            <textarea
              id="description"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Summary of project goals and scope"
              className="w-full p-3.5 rounded-xl border border-[#E7D5BF] bg-white text-sm text-[#292524] placeholder-[#A8A29E] focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]"
            />
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
                  <span>Creating...</span>
                </>
              ) : (
                'Create project'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
