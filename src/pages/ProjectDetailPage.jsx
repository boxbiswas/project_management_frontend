import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProjectById,
  deleteProject,
  removeProjectMember,
} from '../redux/slices/projectSlice.js';
import { fetchTicketsByProject } from '../redux/slices/ticketSlice.js';
import AddMemberModal from '../components/projects/AddMemberModal.jsx';
import EditProjectModal from '../components/projects/EditProjectModal.jsx';
import TicketList from '../components/tickets/TicketList.jsx';
import CreateTicketModal from '../components/tickets/CreateTicketModal.jsx';
import KanbanBoard from '../components/kanban/KanbanBoard.jsx';
import {
  Users,
  UserPlus,
  Trash2,
  Edit,
  ChevronRight,
  Shield,
  Loader2,
  Calendar,
  Layers,
  Plus,
  Kanban,
} from 'lucide-react';

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentProject, loading: projectLoading, error: projectError } = useSelector((state) => state.projects);
  const { tickets, loading: ticketsLoading } = useSelector((state) => state.tickets);
  const { user } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState('board');
  const [createTicketStatus, setCreateTicketStatus] = useState('todo');
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [createTicketOpen, setCreateTicketOpen] = useState(false);

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectById(projectId));
      dispatch(fetchTicketsByProject(projectId));
    }
  }, [dispatch, projectId]);

  if (projectLoading && !currentProject) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-[#78716C]">
        <Loader2 className="w-8 h-8 animate-spin text-[#F97316] mb-3" />
        <p className="text-sm">Loading project details...</p>
      </div>
    );
  }

  if (projectError || !currentProject) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-xl font-bold text-[#292524] mb-2">Couldn't load this project</h2>
        <p className="text-sm text-[#78716C] mb-6">{projectError || 'Project not found or access denied.'}</p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#EA580C] text-white text-sm font-semibold"
        >
          Back to projects
        </Link>
      </div>
    );
  }

  const isOwner = currentProject.createdBy?._id === user?.id || currentProject.createdBy === user?.id;
  const currentMember = currentProject.teamMembers?.find(
    (m) => (m.userId?._id || m.userId) === user?.id
  );
  const canManage = isOwner || (currentMember && (currentMember.role === 'admin' || currentMember.role === 'manager'));
  const canCreateTicket = isOwner || (currentMember && currentMember.role !== 'viewer');

  const handleRemoveMember = async (memberUserId, memberName) => {
    if (window.confirm(`Are you sure you want to remove ${memberName || 'this member'} from the project?`)) {
      dispatch(removeProjectMember({ projectId, userId: memberUserId }));
    }
  };

  const handleDeleteProject = async () => {
    if (window.confirm(`Are you sure you want to delete "${currentProject.title}"? This cannot be undone.`)) {
      await dispatch(deleteProject(projectId));
      navigate('/projects', { replace: true });
    }
  };

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-[#FFEDD5] text-[#9A3412] border-[#FED7AA]';
      case 'manager':
        return 'bg-[#EDE9FE] text-[#5B21B6] border-[#DDD6FE]';
      case 'developer':
        return 'bg-[#E0F2FE] text-[#075985] border-[#BAE6FD]';
      case 'viewer':
      default:
        return 'bg-[#F0EBE4] text-[#57534E] border-[#E7D5BF]';
    }
  };

  const getInitials = (userObj) => {
    if (!userObj?.name) return 'U';
    const parts = userObj.name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb navigation */}
      <nav className="flex items-center gap-2 text-sm text-[#78716C]">
        <Link to="/projects" className="hover:text-[#C2410C] hover:underline">
          Projects
        </Link>
        <ChevronRight className="w-4 h-4 text-[#A8A29E]" />
        <span className="font-semibold text-[#292524] truncate max-w-xs">{currentProject.title}</span>
      </nav>

      {/* Project Header Banner */}
      <div className="bg-white rounded-2xl border border-[#F5E6D3] p-6 sm:p-8 shadow-[0_1px_3px_rgba(124,45,18,0.05),0_1px_2px_rgba(124,45,18,0.06)] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#FFEDD5] text-[#9A3412] font-bold text-2xl flex items-center justify-center shrink-0 border border-[#FED7AA]">
            {currentProject.title ? currentProject.title[0].toUpperCase() : 'P'}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#292524] tracking-tight">
              {currentProject.title}
            </h1>
            <p className="text-sm text-[#78716C] mt-1 max-w-2xl leading-relaxed">
              {currentProject.description || 'No description provided.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-center">
          {canCreateTicket && (
            <button
              type="button"
              onClick={() => setCreateTicketOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-sm font-semibold transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>New ticket</span>
            </button>
          )}

          {canManage && (
            <>
              <button
                type="button"
                onClick={() => setEditModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-[#E7D5BF] bg-white text-sm font-semibold text-[#44403C] hover:bg-[#FFF7ED] transition-colors"
                title="Edit project"
              >
                <Edit className="w-4 h-4" />
                <span className="hidden sm:inline">Edit</span>
              </button>
              <button
                type="button"
                onClick={handleDeleteProject}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-red-200 bg-white text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                title="Delete project"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Delete</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-[#F5E6D3] flex items-center gap-6">
        <button
          type="button"
          onClick={() => setActiveTab('board')}
          className={`pb-3 text-sm font-semibold transition-colors relative flex items-center gap-2 ${
            activeTab === 'board'
              ? 'text-[#C2410C]'
              : 'text-[#78716C] hover:text-[#292524]'
          }`}
        >
          <Kanban className="w-4 h-4" />
          <span>Board</span>
          <span className="px-2 py-0.5 rounded-full text-xs bg-[#FAF5EE] text-[#78716C]">
            {tickets.length}
          </span>
          {activeTab === 'board' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F97316] rounded-full" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('tickets')}
          className={`pb-3 text-sm font-semibold transition-colors relative flex items-center gap-2 ${
            activeTab === 'tickets'
              ? 'text-[#C2410C]'
              : 'text-[#78716C] hover:text-[#292524]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>List</span>
          {activeTab === 'tickets' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F97316] rounded-full" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`pb-3 text-sm font-semibold transition-colors relative ${
            activeTab === 'overview'
              ? 'text-[#C2410C]'
              : 'text-[#78716C] hover:text-[#292524]'
          }`}
        >
          Overview
          {activeTab === 'overview' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F97316] rounded-full" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('members')}
          className={`pb-3 text-sm font-semibold transition-colors relative flex items-center gap-2 ${
            activeTab === 'members'
              ? 'text-[#C2410C]'
              : 'text-[#78716C] hover:text-[#292524]'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Team Members</span>
          <span className="px-2 py-0.5 rounded-full text-xs bg-[#FAF5EE] text-[#78716C]">
            {currentProject.teamMembers?.length || 0}
          </span>
          {activeTab === 'members' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F97316] rounded-full" />
          )}
        </button>
      </div>

      {/* Tab Content: Kanban Board */}
      {activeTab === 'board' && (
        <div>
          {ticketsLoading && tickets.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-[#78716C]">
              <Loader2 className="w-8 h-8 animate-spin text-[#F97316] mb-3" />
              <p className="text-sm">Loading board...</p>
            </div>
          ) : (
            <KanbanBoard
              tickets={tickets}
              canManage={canCreateTicket}
              onAddTicket={(status) => {
                setCreateTicketStatus(status);
                setCreateTicketOpen(true);
              }}
            />
          )}
        </div>
      )}

      {/* Tab Content: Tickets List */}
      {activeTab === 'tickets' && (
        <div>
          {ticketsLoading && tickets.length === 0 ? (
            <div className="py-20 flex flex-col items-center justify-center text-[#78716C]">
              <Loader2 className="w-8 h-8 animate-spin text-[#F97316] mb-3" />
              <p className="text-sm">Loading tickets...</p>
            </div>
          ) : (
            <TicketList
              tickets={tickets}
              onOpenCreateModal={() => setCreateTicketOpen(true)}
              canCreateTicket={canCreateTicket}
            />
          )}
        </div>
      )}

      {/* Tab Content: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-2xl border border-[#F5E6D3] p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-[#292524]">Project Scope & Details</h2>
            <p className="text-sm text-[#44403C] leading-relaxed">
              {currentProject.description || 'No detailed scope description provided yet.'}
            </p>

            <div className="pt-4 border-t border-[#F5E6D3] grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-[#78716C]">
              <div>
                <span className="block font-medium text-[#A8A29E] mb-0.5">Created By</span>
                <span className="font-semibold text-[#292524]">
                  {currentProject.createdBy?.name || 'Owner'}
                </span>
              </div>
              <div>
                <span className="block font-medium text-[#A8A29E] mb-0.5">Created Date</span>
                <span className="font-semibold text-[#292524]">
                  {new Date(currentProject.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div>
                <span className="block font-medium text-[#A8A29E] mb-0.5">Team Size</span>
                <span className="font-semibold text-[#292524]">
                  {currentProject.teamMembers?.length || 0} members
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#F5E6D3] p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-base font-bold text-[#292524] mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#F97316]" />
                <span>Team Roster</span>
              </h2>
              <div className="space-y-2.5">
                {currentProject.teamMembers?.slice(0, 5).map((m, idx) => (
                  <div key={m.userId?._id || idx} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 truncate">
                      <div className="w-6 h-6 rounded-full bg-[#FFEDD5] text-[#9A3412] font-bold text-[10px] flex items-center justify-center shrink-0">
                        {getInitials(m.userId)}
                      </div>
                      <span className="font-medium text-[#292524] truncate">{m.userId?.name || 'Member'}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getRoleBadgeClass(m.role)}`}>
                      {m.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('members')}
              className="mt-4 pt-3 border-t border-[#F5E6D3] text-xs font-semibold text-[#EA580C] hover:underline text-left"
            >
              Manage all {currentProject.teamMembers?.length || 0} members &rarr;
            </button>
          </div>
        </div>
      )}

      {/* Tab Content: Members */}
      {activeTab === 'members' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#78716C]">
              Members have access to view and collaborate on tickets in this project.
            </p>

            {canManage && (
              <button
                type="button"
                onClick={() => setAddMemberOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-sm font-semibold transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add member</span>
              </button>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-[#F5E6D3] shadow-sm overflow-hidden">
            <div className="divide-y divide-[#F5E6D3]">
              {currentProject.teamMembers?.map((m) => {
                const memberUser = m.userId || {};
                const isCreator = currentProject.createdBy?._id === memberUser._id || currentProject.createdBy === memberUser._id;

                return (
                  <div
                    key={memberUser._id}
                    className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-[#FFFBF5] transition-colors"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-[#FFEDD5] text-[#9A3412] font-bold text-sm flex items-center justify-center shrink-0 border border-[#FED7AA]">
                        {getInitials(memberUser)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-[#292524] truncate">
                            {memberUser.name || 'Unnamed Member'}
                          </p>
                          {isCreator && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FFF7ED] text-[#9A3412] border border-[#FED7AA]">
                              Creator
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#78716C] truncate">{memberUser.email || '—'}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border capitalize ${getRoleBadgeClass(m.role)}`}>
                        {m.role}
                      </span>

                      {canManage && !isCreator && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(memberUser._id, memberUser.name)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[#78716C] hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Remove member"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <CreateTicketModal
        isOpen={createTicketOpen}
        onClose={() => setCreateTicketOpen(false)}
        projectId={projectId}
        projectMembers={currentProject.teamMembers || []}
        initialStatus={createTicketStatus}
      />

      <AddMemberModal
        isOpen={addMemberOpen}
        onClose={() => setAddMemberOpen(false)}
        projectId={projectId}
      />

      <EditProjectModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        project={currentProject}
      />
    </div>
  );
}
