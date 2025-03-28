import { Outlet } from 'react-router-dom';

export default function AssessmentLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Outlet />
    </div>
  );
} 