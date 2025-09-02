import { useAuth } from '@/providers/auth-context'
import { Navigate, Outlet } from 'react-router'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (!loading && !user) {
    return <Navigate to="/login" replace />
  }

  if (loading) {
    return (
      <div className="bg-black text-white flex grow justify-center items-center">
        Loading...
      </div>
    )
  }

  return <Outlet />
}
