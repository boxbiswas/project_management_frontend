import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/slices/authSlice.js';
import {
  LayoutDashboard,
  FolderKanban,
  UserCircle,
  LogOut,
  X,
  Layout,
} from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  const navItems = [
    { label: 'Dashboard', to: '/', icon: LayoutDashboard, end: true },
    { label: 'Projects', to: '/projects', icon: FolderKanban, end: false },
    { label: 'Profile', to: '/profile', icon: UserCircle, end: true },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#292524]/40 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#F5E6D3] flex flex-col justify-between transition-transform duration-200 ease-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo row (64px high, matching topbar) */}
          <div className="h-16 px-6 border-b border-[#F5E6D3] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[10px] bg-[#F97316] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                <div className="flex items-end gap-0.5 h-4">
                  <div className="w-1 h-2.5 bg-white rounded-xs" />
                  <div className="w-1 h-4 bg-white rounded-xs" />
                  <div className="w-1 h-3 bg-white rounded-xs" />
                </div>
              </div>
              <span className="font-bold text-xl tracking-tight text-[#292524]">BugBoard</span>
            </div>

            {/* Mobile close button */}
            <button
              type="button"
              onClick={onClose}
              className="lg:hidden w-8 h-8 rounded-full flex items-center justify-center text-[#78716C] hover:bg-[#FFF7ED]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation entries */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.end}
                  onClick={() => onClose && onClose()}
                  className={({ isActive }) =>
                    `relative flex items-center gap-3 h-11 px-3.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#FFF7ED] text-[#C2410C] font-semibold'
                        : 'text-[#78716C] hover:text-[#292524] hover:bg-[#FFF7ED]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#F97316] rounded-r-full" />
                      )}
                      <Icon className={`w-5 h-5 ${isActive ? 'text-[#F97316]' : 'text-[#A8A29E]'}`} />
                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User card at sidebar bottom */}
        <div className="p-4 border-t border-[#F5E6D3]">
          <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-[#FAF5EE]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#FFEDD5] text-[#9A3412] font-bold text-xs flex items-center justify-center shrink-0 border border-[#FED7AA]">
                {getInitials(user?.name)}
              </div>
              <div className="min-w-0 truncate">
                <p className="text-xs font-semibold text-[#292524] truncate leading-tight">
                  {user?.name || 'User'}
                </p>
                <p className="text-[11px] text-[#78716C] truncate leading-tight">
                  {user?.email || ''}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#78716C] hover:text-[#C2410C] hover:bg-[#FFF7ED] transition-colors shrink-0"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
