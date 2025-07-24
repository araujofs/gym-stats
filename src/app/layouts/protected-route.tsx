import { useAuth } from '@/providers/auth-context'
import { Navigate, Outlet } from 'react-router'

export default function ProtectedRoute() {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
