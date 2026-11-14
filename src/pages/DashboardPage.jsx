import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '../redux/slices/projectSlice.js';
import { UserCheck, Sparkles, FolderKanban, ArrowRight, Calendar, Mail, Shield, Plus } from 'lucide-react';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

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
              Manage your projects, team workspaces, and bug tracking.
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFF7ED] text-[#9A3412] border border-[#FED7AA] text-sm font-medium">
          <Sparkles className="w-4 h-4 text-[#F97316]" />
          <span>Day 3 Complete</span>
        </div>
      </div>

      {/* Profile summary and projects quick access */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Profile */}
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

        {/* Projects Quick Access Card */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-[#F5E6D3] p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#F97316]">Active Workspaces</span>
              <span className="text-xs text-[#78716C]">{projects.length} {projects.length === 1 ? 'project' : 'projects'}</span>
            </div>
            <h2 className="text-lg font-bold text-[#292524] tracking-tight">Project Management & Team Collaboration</h2>
            <p className="text-sm text-[#78716C] mt-1 leading-relaxed">
              Create and manage projects, invite registered teammates with role-based access (<code className="bg-[#FAF5EE] px-1.5 py-0.5 rounded text-xs text-[#9A3412]">admin</code>, <code className="bg-[#FAF5EE] px-1.5 py-0.5 rounded text-xs text-[#5B21B6]">manager</code>, <code className="bg-[#FAF5EE] px-1.5 py-0.5 rounded text-xs text-[#075985]">developer</code>, <code className="bg-[#FAF5EE] px-1.5 py-0.5 rounded text-xs text-[#57534E]">viewer</code>), and organize your sprint boards.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-[#F5E6D3] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[#78716C]">
              <FolderKanban className="w-4 h-4 text-[#F97316]" />
              <span>{projects.length} accessible projects</span>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-semibold transition-colors"
            >
              <span>View all projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
