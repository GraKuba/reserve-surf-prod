import { Outlet } from 'react-router-dom'

export default function OnboardingLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Outlet />
    </div>
  )
}