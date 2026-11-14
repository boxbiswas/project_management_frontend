import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ChevronsUpDown, Check, FolderKanban } from 'lucide-react';

export default function ProjectSelector() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { projects } = useSelector((state) => state.projects);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeProject = projects.find((p) => p._id === projectId);
  const initial = activeProject?.title ? activeProject.title[0].toUpperCase() : 'P';

  const handleSelect = (id) => {
    setIsOpen(false);
    navigate(`/projects/${id}`);
  };

  const handleViewAll = () => {
    setIsOpen(false);
    navigate('/projects');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Selector pill button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 h-9 px-3 rounded-full bg-white border border-[#E7D5BF] hover:border-[#D6BFA3] hover:bg-[#FFF7ED] text-xs font-semibold text-[#292524] transition-colors shadow-xs"
        aria-label="Select project"
      >
        {activeProject ? (
          <>
            <div className="w-5 h-5 rounded-md bg-[#FFEDD5] text-[#9A3412] text-[10px] font-bold flex items-center justify-center shrink-0">
              {initial}
            </div>
            <span className="truncate max-w-[120px] sm:max-w-[160px]">{activeProject.title}</span>
          </>
        ) : (
          <>
            <FolderKanban className="w-4 h-4 text-[#F97316]" />
            <span>Select project</span>
          </>
        )}
        <ChevronsUpDown className="w-3.5 h-3.5 text-[#78716C]" />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute left-0 mt-1.5 w-60 bg-white rounded-xl border border-[#F5E6D3] shadow-lg p-1.5 z-40">
          <div className="px-2.5 py-1 text-[11px] font-semibold text-[#A8A29E] uppercase tracking-wider">
            Your projects
          </div>

          <div className="max-h-56 overflow-y-auto space-y-0.5">
            {projects.length === 0 ? (
              <div className="px-3 py-2 text-xs text-[#78716C] italic">No projects created yet</div>
            ) : (
              projects.slice(0, 8).map((project) => {
                const isSelected = project._id === projectId;
                const pInitial = project.title ? project.title[0].toUpperCase() : 'P';

                return (
                  <button
                    key={project._id}
                    type="button"
                    onClick={() => handleSelect(project._id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium text-left transition-colors ${
                      isSelected
                        ? 'bg-[#FFF7ED] text-[#C2410C]'
                        : 'text-[#44403C] hover:bg-[#FAF5EE] hover:text-[#292524]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <div className="w-5 h-5 rounded-md bg-[#FFEDD5] text-[#9A3412] text-[10px] font-bold flex items-center justify-center shrink-0">
                        {pInitial}
                      </div>
                      <span className="truncate">{project.title}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer view all link */}
          <div className="pt-1 mt-1 border-t border-[#F5E6D3]">
            <button
              type="button"
              onClick={handleViewAll}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#EA580C] hover:bg-[#FFF7ED] transition-colors"
            >
              <FolderKanban className="w-3.5 h-3.5" />
              <span>All projects</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
