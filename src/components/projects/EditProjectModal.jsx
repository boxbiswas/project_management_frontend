import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateProject } from '../../redux/slices/projectSlice.js';
import { X, Loader2 } from 'lucide-react';

export default function EditProjectModal({ isOpen, onClose, project }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
      });
      setError('');
    }
  }, [project]);

  if (!isOpen || !project) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Project title is required');
      return;
    }

    setSubmitting(true);
    setError('');

    const result = await dispatch(
      updateProject({
        projectId: project._id,
        data: {
          title: formData.title.trim(),
          description: formData.description.trim(),
        },
      })
    );

    setSubmitting(false);

    if (updateProject.fulfilled.match(result)) {
      onClose();
    } else {
      setError(result.payload || 'Failed to update project');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-[#292524]/45 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-[520px] bg-white rounded-2xl border border-[#F5E6D3] p-6 sm:p-7 shadow-[0_20px_40px_rgba(124,45,18,0.16)] z-10">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-[#292524] tracking-tight">Edit project</h2>
            <p className="text-sm text-[#78716C] mt-0.5">Update project details</p>
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
            <label className="block text-sm font-semibold text-[#292524] mb-1.5" htmlFor="edit-title">
              Project title
            </label>
            <input
              id="edit-title"
              type="text"
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                if (error) setError('');
              }}
              className="w-full h-11 px-3.5 rounded-xl border border-[#E7D5BF] bg-white text-sm text-[#292524] focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#292524] mb-1.5" htmlFor="edit-description">
              Description <span className="font-normal text-[#78716C]">(optional)</span>
            </label>
            <textarea
              id="edit-description"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3.5 rounded-xl border border-[#E7D5BF] bg-white text-sm text-[#292524] focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]"
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
                  <span>Saving...</span>
                </>
              ) : (
                'Save changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
