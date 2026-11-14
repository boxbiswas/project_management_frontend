import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/slices/authSlice.js';
import { Shield, Mail, Calendar, Key, LogOut, UserCheck } from 'lucide-react';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recently';

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#292524] tracking-tight">Account Profile</h1>
        <p className="text-sm text-[#78716C] mt-0.5">Manage your personal settings and active session</p>
      </div>

      {/* Profile Overview Card */}
      <div className="bg-white rounded-2xl border border-[#F5E6D3] p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#FFEDD5] text-[#9A3412] font-bold text-2xl flex items-center justify-center border-2 border-[#FED7AA]">
            {getInitials(user?.name)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#292524]">{user?.name}</h2>
            <p className="text-sm text-[#78716C] mt-0.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#A8A29E]" />
              <span>{user?.email}</span>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign out</span>
        </button>
      </div>

      {/* Account Details & Security Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-[#F5E6D3] p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 font-bold text-[#292524] text-sm">
            <UserCheck className="w-4 h-4 text-[#F97316]" />
            <span>Account Details</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="block text-[#A8A29E] font-medium mb-0.5">Full Name</span>
              <span className="text-sm font-semibold text-[#292524]">{user?.name}</span>
            </div>
            <div>
              <span className="block text-[#A8A29E] font-medium mb-0.5">Email Address</span>
              <span className="text-sm font-semibold text-[#292524]">{user?.email}</span>
            </div>
            <div>
              <span className="block text-[#A8A29E] font-medium mb-0.5">Member Since</span>
              <span className="text-sm font-semibold text-[#292524] flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-[#A8A29E]" />
                <span>{memberSince}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#F5E6D3] p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 font-bold text-[#292524] text-sm">
            <Shield className="w-4 h-4 text-[#F97316]" />
            <span>Security & Session</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="block text-[#A8A29E] font-medium mb-0.5">Authentication Provider</span>
              <span className="text-sm font-semibold text-[#292524]">JWT &amp; bcrypt</span>
            </div>
            <div>
              <span className="block text-[#A8A29E] font-medium mb-0.5">Account ID</span>
              <span className="font-mono bg-[#FAF5EE] px-2 py-0.5 rounded text-[#44403C] text-[11px]">
                {user?._id || user?.id}
              </span>
            </div>
            <div>
              <span className="block text-[#A8A29E] font-medium mb-0.5">Session Status</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#F0FDF4] text-[#166534] font-semibold text-[11px] border border-[#BBF7D0]">
                Active &amp; Verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
