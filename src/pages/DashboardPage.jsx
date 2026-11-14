import React from 'react';
import { useSelector } from 'react-redux';
import { UserCheck, Sparkles, FolderPlus, ArrowRight, Calendar, Mail, Shield } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useSelector((state) => state.auth);

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((p) => p[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'U';

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Today';

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="bg-white rounded-2xl border border-[#F5E6D3] p-6 sm:p-8 shadow-[0_1px_3px_rgba(124,45,18,0.05),0_1px_2px_rgba(124,45,18,0.06)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#FFEDD5] text-[#9A3412] font-bold text-xl flex items-center justify-center border-2 border-[#FED7AA] shadow-sm">
            {initials}
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F0FDF4] text-[#166534] text-xs font-medium border border-[#BBF7D0] mb-1.5">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Authenticated Session Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#292524] tracking-tight">
              Welcome back, {user?.name || 'User'}!
            </h1>
            <p className="text-sm text-[#78716C] mt-0.5">
              Day 2 authentication system verified and operational.
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFF7ED] text-[#9A3412] border border-[#FED7AA] text-sm font-medium">
          <Sparkles className="w-4 h-4 text-[#F97316]" />
          <span>Day 2 Complete</span>
        </div>
      </div>

      {/* Profile summary and next milestone preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-[#F5E6D3] p-6 shadow-sm">
          <h2 className="text-base font-bold text-[#292524] mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#F97316]" />
            <span>Profile Details</span>
          </h2>
          <div className="space-y-3.5 text-sm">
            <div className="flex items-center gap-2 text-[#78716C]">
              <Mail className="w-4 h-4 text-[#A8A29E]" />
              <span className="text-[#292524] font-medium truncate">{user?.email}</span>
            </div>
            <div className="flex items-center gap-2 text-[#78716C]">
              <Calendar className="w-4 h-4 text-[#A8A29E]" />
              <span>Member since {memberSince}</span>
            </div>
            <div className="pt-2 border-t border-[#F5E6D3] flex items-center justify-between text-xs text-[#78716C]">
              <span>User ID</span>
              <span className="font-mono bg-[#FAF5EE] px-2 py-0.5 rounded text-[#44403C] text-[11px]">
                {user?._id || user?.id || '—'}
              </span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 bg-white rounded-2xl border border-[#F5E6D3] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#F97316]">Next Milestone</span>
              <span className="text-xs text-[#78716C]">Day 3</span>
            </div>
            <h2 className="text-lg font-bold text-[#292524] tracking-tight">Project Management & Team Members</h2>
            <p className="text-sm text-[#78716C] mt-1 leading-relaxed">
              In Day 3, we will implement the Project Mongoose model, CRUD APIs at <code className="bg-[#FAF5EE] px-1.5 py-0.5 rounded text-xs text-[#9A3412]">/projects</code>, project creation cards, and team member management with role-based assignment.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-[#F5E6D3] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[#78716C]">
              <FolderPlus className="w-4 h-4 text-[#F97316]" />
              <span>Database model ready: Project.js</span>
            </div>
            <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#EA580C]">
              <span>Ready to proceed</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
