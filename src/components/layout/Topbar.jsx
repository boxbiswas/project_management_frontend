import React from 'react';
import { Menu } from 'lucide-react';
import Breadcrumbs from './Breadcrumbs.jsx';
import ProjectSelector from './ProjectSelector.jsx';
import { useSelector } from 'react-redux';

export default function Topbar({ onToggleSidebar }) {
  const { user } = useSelector((state) => state.auth);

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  return (
    <header className="h-16 bg-white border-b border-[#F5E6D3] px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Mobile menu toggle and Breadcrumbs */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-[#78716C] hover:bg-[#FFF7ED] hover:text-[#292524] transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Breadcrumbs />
      </div>

      {/* Right: Project Selector and User Avatar */}
      <div className="flex items-center gap-3 shrink-0">
        <ProjectSelector />

        <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-[#F5E6D3]">
          <div className="w-8 h-8 rounded-full bg-[#FFEDD5] text-[#9A3412] font-semibold text-xs flex items-center justify-center border border-[#FED7AA]">
            {getInitials(user?.name)}
          </div>
          <span className="text-xs font-semibold text-[#292524] truncate max-w-[120px]">
            {user?.name || 'User'}
          </span>
        </div>
      </div>
    </header>
  );
}
