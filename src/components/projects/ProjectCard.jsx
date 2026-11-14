import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, Users, Trash2, Edit } from 'lucide-react';

export default function ProjectCard({ project, onEdit, onDelete, canManage }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const initial = project.title ? project.title[0].toUpperCase() : 'P';
  const members = project.teamMembers || [];

  const handleCardClick = () => {
    navigate(`/projects/${project._id}`);
  };

  const getMemberInitials = (userObj) => {
    if (!userObj?.name) return 'U';
    const parts = userObj.name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl border border-[#F5E6D3] p-5 shadow-[0_1px_3px_rgba(124,45,18,0.05),0_1px_2px_rgba(124,45,18,0.06)] hover:border-[#FDBA74] hover:shadow-[0_6px_16px_rgba(124,45,18,0.10)] transition-all duration-150 cursor-pointer flex flex-col justify-between"
    >
      {/* Card header with initial tile and actions menu */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#FFEDD5] text-[#9A3412] font-bold text-base flex items-center justify-center shrink-0 border border-[#FED7AA]">
            {initial}
          </div>

          {canManage && (
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#78716C] hover:text-[#292524] hover:bg-[#FFF7ED] transition-colors"
                aria-label="Project actions"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 top-9 w-36 bg-white rounded-xl border border-[#F5E6D3] shadow-lg p-1.5 z-20 space-y-0.5 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        onEdit(project);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[#44403C] hover:bg-[#FFF7ED] hover:text-[#9A3412] font-medium"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit details</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        onDelete(project);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-red-600 hover:bg-red-50 font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete project</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Title and description */}
        <h3 className="text-lg font-bold text-[#292524] group-hover:text-[#EA580C] transition-colors line-clamp-1 mb-1.5">
          {project.title}
        </h3>
        <p className="text-sm text-[#78716C] line-clamp-2 leading-relaxed min-h-[2.5rem]">
          {project.description || 'No description provided.'}
        </p>
      </div>

      {/* Footer with member avatars and count */}
      <div className="mt-5 pt-3.5 border-t border-[#F5E6D3] flex items-center justify-between">
        <div className="flex items-center -space-x-2 overflow-hidden">
          {members.slice(0, 4).map((m, idx) => (
            <div
              key={m.userId?._id || idx}
              title={m.userId?.name || 'Member'}
              className="w-7 h-7 rounded-full bg-[#FFEDD5] text-[#9A3412] text-[11px] font-bold flex items-center justify-center border-2 border-white shadow-xs"
            >
              {getMemberInitials(m.userId)}
            </div>
          ))}
          {members.length > 4 && (
            <div className="w-7 h-7 rounded-full bg-[#FAF5EE] text-[#78716C] text-[10px] font-bold flex items-center justify-center border-2 border-white">
              +{members.length - 4}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#78716C]">
          <Users className="w-3.5 h-3.5" />
          <span>{members.length} {members.length === 1 ? 'member' : 'members'}</span>
        </div>
      </div>
    </div>
  );
}
