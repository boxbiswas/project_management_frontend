import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardLayout from '../layouts/DashboardLayout.jsx';

// Guard for protected application routes using the DashboardLayout shell
export default function ProtectedRoutes() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <DashboardLayout />;
}
