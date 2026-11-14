import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, deleteProject } from '../redux/slices/projectSlice.js';
import ProjectCard from '../components/projects/ProjectCard.jsx';
import CreateProjectModal from '../components/projects/CreateProjectModal.jsx';
import EditProjectModal from '../components/projects/EditProjectModal.jsx';
import { Plus, FolderKanban, Loader2 } from 'lucide-react';

export default function ProjectsPage() {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.projects);
  const { user } = useSelector((state) => state.auth);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleEdit = (project) => {
    setEditingProject(project);
  };

  const handleDelete = async (project) => {
    if (window.confirm(`Are you sure you want to delete "${project.title}"? This cannot be undone.`)) {
      dispatch(deleteProject(project._id));
    }
  };

  const canManageProject = (project) => {
    if (!user) return false;
    const isOwner = project.createdBy?._id === user.id || project.createdBy === user.id;
    const member = project.teamMembers?.find(
      (m) => (m.userId?._id || m.userId) === user.id
    );
    const isAdminOrManager = member && (member.role === 'admin' || member.role === 'manager');
    return isOwner || isAdminOrManager;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#292524] tracking-tight">Projects</h1>
          <p className="text-sm text-[#78716C] mt-0.5">Manage your workspaces, bug boards, and team members</p>
        </div>

        <button
          type="button"
          onClick={() => setCreateModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-sm font-semibold transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New project</span>
        </button>
      </div>

      {/* Loading state */}
      {loading && projects.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center text-[#78716C]">
          <Loader2 className="w-8 h-8 animate-spin text-[#F97316] mb-3" />
          <p className="text-sm">Loading projects...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && projects.length === 0 && (
        <div className="py-16 px-4 bg-white rounded-2xl border border-[#F5E6D3] text-center max-w-md mx-auto my-8 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#FFEDD5] text-[#F97316] flex items-center justify-center mx-auto mb-4">
            <FolderKanban className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#292524] mb-1">Create your first project</h3>
          <p className="text-sm text-[#78716C] mb-6 leading-relaxed">
            Projects hold your tickets, team members, and Kanban boards. Get started by creating your first workspace.
          </p>
          <button
            type="button"
            onClick={() => setCreateModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-sm font-semibold transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New project</span>
          </button>
        </div>
      )}

      {/* Project Cards Grid */}
      {projects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onEdit={handleEdit}
              onDelete={handleDelete}
              canManage={canManageProject(project)}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <CreateProjectModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />

      <EditProjectModal
        isOpen={!!editingProject}
        onClose={() => setEditingProject(null)}
        project={editingProject}
      />
    </div>
  );
}
