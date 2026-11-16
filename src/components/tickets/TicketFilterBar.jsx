import React from 'react';
import { Search, X, Filter, RotateCcw, User, Layers, ArrowUp, ArrowDown, Minus } from 'lucide-react';

export default function TicketFilterBar({
  search = '',
  onSearchChange,
  status = 'all',
  onStatusChange,
  priority = 'all',
  onPriorityChange,
  assignee = 'all',
  onAssigneeChange,
  projectMembers = [],
  totalTickets = 0,
  filteredCount = 0,
  onClearFilters,
}) {
  const hasActiveFilters =
    search.trim() !== '' ||
    status !== 'all' ||
    priority !== 'all' ||
    assignee !== 'all';

  return (
    <div className="bg-white rounded-2xl border border-[#F5E6D3] p-4 shadow-[0_1px_3px_rgba(124,45,18,0.05),0_1px_2px_rgba(124,45,18,0.06)] space-y-3">
      {/* Top row: Search input and dropdown filters */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
        {/* Keyword Search Bar */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A8A29E]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tickets by title, keyword, description..."
            className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm bg-[#FAF5EE] rounded-xl border border-[#F5E6D3] text-[#292524] placeholder-[#A8A29E] focus:bg-white focus:outline-hidden focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/15 transition-all"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#A8A29E] hover:text-[#292524]"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filters Group */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
          {/* Status Dropdown Filter */}
          <div className="relative flex-1 sm:flex-none min-w-[125px]">
            <select
              value={status}
              onChange={(e) => onStatusChange(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-[#E7D5BF] bg-[#FAF5EE] text-[#44403C] hover:bg-white focus:bg-white focus:outline-hidden focus:border-[#F97316] cursor-pointer transition-colors"
            >
              <option value="all">All Statuses</option>
              <option value="todo">To do</option>
              <option value="in_progress">In progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          {/* Priority Dropdown Filter */}
          <div className="relative flex-1 sm:flex-none min-w-[125px]">
            <select
              value={priority}
              onChange={(e) => onPriorityChange(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-[#E7D5BF] bg-[#FAF5EE] text-[#44403C] hover:bg-white focus:bg-white focus:outline-hidden focus:border-[#F97316] cursor-pointer transition-colors"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>

          {/* Assignee Dropdown Filter */}
          <div className="relative flex-1 sm:flex-none min-w-[135px]">
            <select
              value={assignee}
              onChange={(e) => onAssigneeChange(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-[#E7D5BF] bg-[#FAF5EE] text-[#44403C] hover:bg-white focus:bg-white focus:outline-hidden focus:border-[#F97316] cursor-pointer transition-colors"
            >
              <option value="all">All Assignees</option>
              <option value="unassigned">Unassigned</option>
              {projectMembers.map((m) => {
                const u = m.userId || {};
                return (
                  <option key={u._id || u.id} value={u._id || u.id}>
                    {u.name || u.email || 'Member'}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Pills and Clear Trigger */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#F5E6D3] text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[#78716C] font-medium mr-1">Active filters:</span>

            {search.trim() && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA] font-medium">
                <span>&quot;{search}&quot;</span>
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {status !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF5EE] text-[#44403C] border border-[#E7D5BF] font-medium capitalize">
                <span>Status: {status.replace('_', ' ')}</span>
                <button
                  type="button"
                  onClick={() => onStatusChange('all')}
                  className="hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {priority !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF5EE] text-[#44403C] border border-[#E7D5BF] font-medium capitalize">
                <span>Priority: {priority}</span>
                <button
                  type="button"
                  onClick={() => onPriorityChange('all')}
                  className="hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {assignee !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FAF5EE] text-[#44403C] border border-[#E7D5BF] font-medium">
                <span>
                  Assignee:{' '}
                  {assignee === 'unassigned'
                    ? 'Unassigned'
                    : projectMembers.find((m) => (m.userId?._id || m.userId?.id) === assignee)?.userId?.name || 'Member'}
                </span>
                <button
                  type="button"
                  onClick={() => onAssigneeChange('all')}
                  className="hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <span className="text-[#78716C]">
              Showing <strong className="text-[#292524]">{filteredCount}</strong> of{' '}
              <strong className="text-[#292524]">{totalTickets}</strong> tickets
            </span>

            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex items-center gap-1 text-[#EA580C] hover:text-[#9A3412] font-semibold hover:underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset all</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
