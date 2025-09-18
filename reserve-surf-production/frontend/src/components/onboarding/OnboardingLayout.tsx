import { Outlet } from 'react-router-dom';
import { MobileNavigation } from './MobileNavigation';

export function OnboardingLayout() {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Outlet />
      <MobileNavigation />
    </div>
  );
}