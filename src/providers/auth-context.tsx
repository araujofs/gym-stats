import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase as db } from '@/lib/db-client'
import type { User } from '@supabase/supabase-js'

type AuthContextType = {
  user: User | null,
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true
})

export default function AuthProvider({children}: {children: ReactNode}) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    db.auth.getSession().then((data) => {
      setUser(data.data.session?.user ?? null)
      setLoading(false)
    })

    setLoading(false)

    const { data: listener } = db.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
} 