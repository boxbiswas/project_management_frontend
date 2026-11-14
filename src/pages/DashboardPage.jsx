import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProjects } from '../redux/slices/projectSlice.js';
import { fetchUserTickets } from '../redux/slices/ticketSlice.js';
import ProjectCard from '../components/projects/ProjectCard.jsx';
import CreateProjectModal from '../components/projects/CreateProjectModal.jsx';
import {
  Circle,
  Loader,
  CheckCircle2,
  FolderKanban,
  ArrowRight,
  Plus,
  ArrowUp,
  Minus,
  ArrowDown,
  Layers,
} from 'lucide-react';

export default function DashboardPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.projects);
  const { userTickets } = useSelector((state) => state.tickets);

  const [createModalOpen, setCreateModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchUserTickets());
  }, [dispatch]);

  const firstName = user?.name ? user.name.split(' ')[0] : 'there';

  // Calculate ticket counts for stat tiles
  const todoCount = userTickets.filter((t) => t.status === 'todo').length;
  const inProgressCount = userTickets.filter((t) => t.status === 'in_progress').length;
  const doneCount = userTickets.filter((t) => t.status === 'done').length;

  // Tickets assigned directly to current user
  const assignedTickets = userTickets.filter(
    (t) => (t.assigneeId?._id || t.assigneeId) === user?.id
  );

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]">
            <ArrowUp className="w-2.5 h-2.5" /> High
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
            <Minus className="w-2.5 h-2.5" /> Medium
          </span>
        );
      case 'low':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]">
            <ArrowDown className="w-2.5 h-2.5" /> Low
          </span>
        );
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'done':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]">
            <CheckCircle2 className="w-2.5 h-2.5 text-[#16A34A]" /> Done
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#E0F2FE] text-[#075985] border-[#BAE6FD]">
            <Loader className="w-2.5 h-2.5 text-[#0EA5E9]" /> In progress
          </span>
        );
      case 'todo':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#F0EBE4] text-[#44403C] border border-[#E7D5BF]">
            <Circle className="w-2.5 h-2.5 text-[#78716C]" /> To do
          </span>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Dashboard Headline per DESIGN.md Section 9.2 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#292524] tracking-tight">
            Welcome back, {firstName}
          </h1>
          <p className="text-sm text-[#78716C] mt-0.5">
            Here's what's happening across your projects and sprint boards.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setCreateModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-semibold transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New project</span>
        </button>
      </div>

      {/* 3 Compact Stat Tiles per DESIGN.md Section 9.2 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Open tickets tile */}
        <div className="bg-white rounded-2xl border border-[#F5E6D3] p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#F0EBE4] text-[#44403C] flex items-center justify-center shrink-0">
            <Circle className="w-6 h-6 text-[#78716C]" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-[#292524] font-mono leading-none">
              {todoCount}
            </div>
            <p className="text-xs font-medium text-[#78716C] mt-1">Open tickets</p>
          </div>
        </div>

        {/* In progress tile */}
        <div className="bg-white rounded-2xl border border-[#F5E6D3] p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#E0F2FE] text-[#075985] flex items-center justify-center shrink-0">
            <Loader className="w-6 h-6 text-[#0EA5E9]" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-[#292524] font-mono leading-none">
              {inProgressCount}
            </div>
            <p className="text-xs font-medium text-[#78716C] mt-1">In progress</p>
          </div>
        </div>

        {/* Done tile */}
        <div className="bg-white rounded-2xl border border-[#F5E6D3] p-5 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#DCFCE7] text-[#166534] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 text-[#16A34A]" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-[#292524] font-mono leading-none">
              {doneCount}
            </div>
            <p className="text-xs font-medium text-[#78716C] mt-1">Done this sprint</p>
          </div>
        </div>
      </div>

      {/* Your Projects Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderKanban className="w-4 h-4 text-[#F97316]" />
            <h2 className="text-lg font-bold text-[#292524] tracking-tight">Your projects</h2>
          </div>
          {projects.length > 0 && (
            <Link
              to="/projects"
              className="text-xs font-semibold text-[#EA580C] hover:text-[#C2410C] hover:underline flex items-center gap-1"
            >
              <span>View all projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {projects.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#F5E6D3] p-8 text-center shadow-sm">
            <p className="text-sm text-[#78716C] mb-3">You don't have any projects yet.</p>
            <button
              type="button"
              onClick={() => setCreateModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-semibold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create project</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.slice(0, 6).map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onEdit={() => navigate(`/projects/${project._id}`)}
                onDelete={() => navigate(`/projects/${project._id}`)}
                canManage={false}
              />
            ))}
          </div>
        )}
      </div>

      {/* Assigned to You Section per DESIGN.md Section 9.2 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#F97316]" />
            <h2 className="text-lg font-bold text-[#292524] tracking-tight">Assigned to you</h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#FAF5EE] text-[#78716C]">
              {assignedTickets.length}
            </span>
          </div>
        </div>

        {assignedTickets.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#F5E6D3] p-8 text-center shadow-sm">
            <p className="text-sm text-[#78716C]">No tickets are currently assigned to you.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-[#F5E6D3] shadow-sm divide-y divide-[#F5E6D3] overflow-hidden">
            {assignedTickets.slice(0, 8).map((ticket) => (
              <div
                key={ticket._id}
                onClick={() => navigate(`/projects/${ticket.projectId?._id || ticket.projectId}`)}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FFFBF5] transition-colors cursor-pointer"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-[#EA580C] truncate">
                      {ticket.projectId?.title || 'Project'}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-[#292524] truncate">
                    {ticket.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  {getPriorityBadge(ticket.priority)}
                  {getStatusBadge(ticket.status)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Creation Modal */}
      <CreateProjectModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </div>
  );
}
