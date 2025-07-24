import { useNavigate } from 'react-router'
import { supabase as db } from '@/lib/db-client'

export default function Confirmed() {
  const navigate = useNavigate()

  db.auth.getSession().then(res => {
    if (res.data.session) {
      navigate('/')
    }
  })
}
