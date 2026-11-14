import React from 'react';
import RegisterForm from '../components/auth/RegisterForm.jsx';
import { CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#FFFBF5]">
      {/* Brand panel with gradient and product messaging */}
      <div className="lg:w-1/2 bg-gradient-to-br from-[#F97316] to-[#EA580C] p-8 lg:p-16 flex flex-col justify-between text-white relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-white/10 pointer-events-none" />

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-white text-[#EA580C] flex items-center justify-center font-bold text-lg shadow-md">
            <div className="flex items-end gap-1 h-5">
              <div className="w-1.5 h-3 bg-[#EA580C] rounded-sm" />
              <div className="w-1.5 h-5 bg-[#EA580C] rounded-sm" />
              <div className="w-1.5 h-4 bg-[#EA580C] rounded-sm" />
            </div>
          </div>
          <span className="font-bold text-2xl tracking-tight text-white">BugBoard</span>
        </div>

        <div className="my-12 lg:my-auto max-w-lg relative z-10">
          <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            Track every bug to done.
          </h1>
          <p className="text-lg text-white/90 leading-relaxed mb-8">
            Warm, intuitive issue tracking designed for high-velocity teams. Triage bugs, organize sprints, and ship quality software without friction.
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-white/90 text-sm">
              <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
              <span>Full Kanban workflow with smooth drag-and-drop</span>
            </div>
            <div className="flex items-center gap-3 text-white/90 text-sm">
              <ShieldCheck className="w-5 h-5 text-white shrink-0" />
              <span>Role-based team security and permissions</span>
            </div>
            <div className="flex items-center gap-3 text-white/90 text-sm">
              <Zap className="w-5 h-5 text-white shrink-0" />
              <span>Real-time filtering, priorities, and instant search</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-white/70 relative z-10">
          &copy; {new Date().getFullYear()} BugBoard. Built for modern development teams.
        </div>
      </div>

      {/* Auth form container */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <RegisterForm />
      </div>
    </div>
  );
}
