import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase as db } from '@/lib/db-client'
import type { User } from '@supabase/supabase-js'

type AuthContextType = {
  user: User | null,
  loading: boolean,
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: () => undefined
})

export default function AuthProvider({children}: {children: ReactNode}) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  function logout() {
    db.auth.signOut().then(() => {
      setUser(null)
    })
  }

  useEffect(() => {
    db.auth.getSession().then((data) => {
      setUser(data.data.session?.user ?? null)
      setLoading(false)
      console.log(user)
    }).catch(error => console.error(error))

    const { data: listener } = db.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
} 