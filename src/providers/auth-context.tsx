import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from 'react'
import { supabase as db } from '@/lib/db-client'
import type { User } from '@supabase/supabase-js'

type AuthContextType = {
  user: UserWithPublicId | null
  loading: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: () => undefined
})

interface UserWithPublicId extends User {
  publicId: number
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserWithPublicId | null>(null)
  const [loading, setLoading] = useState(true)

  function logout() {
    db.auth.signOut().then(() => {
      setUser(null)
    })
  }

  useEffect(() => {
    db.auth
      .getSession()
      .then(val => {
        if (val.error) {
          setUser(null)
          return
        }

        db.from('users')
          .select('id')
          .eq('uid', val.data.session?.user.id)
          .single()
          .then(({ data }) => {
            if (data) {
              setUser(
                val.data.session?.user
                  ? { ...val.data.session?.user, publicId: data.id }
                  : null
              )
            }
            setLoading(false)
          })
      })
      .catch(error => console.error(error))

    const { data: listener } = db.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        db.from('users')
          .select('id')
          .eq('uid', session.user.id)
          .single()
          .then(({ data }) => {
            if (data) {
              setUser({ ...session.user, publicId: data.id })
            }
          })
      } else {
        setUser(null)
      }
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
