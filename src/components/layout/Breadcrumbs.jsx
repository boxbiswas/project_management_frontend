import React from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs() {
  const location = useLocation();
  const { projectId } = useParams();
  const { currentProject } = useSelector((state) => state.projects);

  const path = location.pathname;

  // Determine breadcrumb segments based on current route
  const getCrumbs = () => {
    if (path === '/' || path === '/dashboard') {
      return [{ label: 'Dashboard', to: null }];
    }

    if (path === '/projects') {
      return [{ label: 'Projects', to: null }];
    }

    if (path.startsWith('/projects/') && projectId) {
      return [
        { label: 'Projects', to: '/projects' },
        { label: currentProject?.title || 'Project', to: null },
      ];
    }

    if (path === '/profile') {
      return [{ label: 'Profile', to: null }];
    }

    return [{ label: 'Overview', to: null }];
  };

  const crumbs = getCrumbs();

  return (
    <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-[#78716C]">
      {crumbs.map((crumb, idx) => {
        const isLast = idx === crumbs.length - 1;

        return (
          <React.Fragment key={crumb.label + idx}>
            {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-[#A8A29E] shrink-0" />}
            {isLast || !crumb.to ? (
              <span className="font-semibold text-[#292524] truncate max-w-[180px] sm:max-w-xs">
                {crumb.label}
              </span>
            ) : (
              <Link to={crumb.to} className="hover:text-[#C2410C] hover:underline truncate">
                {crumb.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
