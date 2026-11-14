import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/slices/authSlice.js';
import { LogOut, Layout } from 'lucide-react';

// Route guard requiring authenticated user state
export default function ProtectedRoutes() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

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

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBF5] text-[#292524]">
      {/* Top navigation header */}
      <header className="h-16 bg-white border-b border-[#F5E6D3] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-[10px] bg-[#F97316] flex items-center justify-center text-white shadow-sm">
            <Layout className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-[#292524]">BugBoard</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FFEDD5] text-[#9A3412] font-semibold text-xs flex items-center justify-center border border-[#FED7AA]">
              {getInitials(user?.name)}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-[#292524] leading-tight">{user?.name || 'User'}</p>
              <p className="text-xs text-[#78716C] leading-tight">{user?.email || ''}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#78716C] hover:text-[#C2410C] hover:bg-[#FFF7ED] rounded-full transition-colors border border-[#E7D5BF]"
            title="Sign out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>

      {/* Main content body */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
