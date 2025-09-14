import Loader from '@/components/app-loader'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { supabase as db } from '@/lib/db-client'
import { useAuth } from '@/providers/auth-context'
import type { Workout } from '@/types/workouts'
import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, Outlet, useOutlet } from 'react-router'
import { toast } from 'sonner'

export const handle = {
  breadcrumb: 'Workout'
}

export default function Workout() {
  const hasOutlet = useOutlet()
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [workouts, setWorkouts] = useState<Workout[]>([])

  function deleteWorkout(id: number) {
    db.from('workout')
      .delete()
      .eq('id', id)
      .select()
      .then(({ error }) => {
        if (error) {
          toast('Error', {
            description: error.message
          })
          return
        }

        setWorkouts(ws => {
          return ws.filter(w => w.id !== id)
        })
      })
  }

  useEffect(() => {
    db.from('workout')
      .select(
        `id,
        name,
        private,
      exercises:planned_exercise (
        *,
        detail:exercise (
          name,
          equipment (
            name
          ),
          target_muscles:target_muscle (
            muscle:muscle_group (
              name
            )
          )
        )
      )`
      )
      .eq('user_id', user?.publicId)
      .then(({ data, error }) => {
        if (error) {
          toast('Error', {
            description: error.message
          })
        }

        setWorkouts(data ?? [])
        setLoading(false)
      })
  }, [])

  if (hasOutlet) return <Outlet />

  if (loading) return <Loader />

  return (
    <div className="w-full flex flex-col flex-1 gap-3 px-2 pb-2">
      <h1 className="font-bold">Workouts</h1>
      {workouts.length !== 0 ? (
        <ul className="flex gap-3">
          {workouts.map(workout => (
            <Card key={workout.id} className="w-1/3 text-gray-300">
              <CardHeader className="h-4">
                <CardTitle>{workout.name}</CardTitle>
                <CardAction>
                  <Button
                    variant={'destructive'}
                    size={'sm'}
                    onClick={() => {
                      deleteWorkout(workout.id)
                    }}
                  >
                    <Trash2 />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <div className="text-sm break-normal">
                  {workout.exercises.map((exerc, idx) => {
                    if (idx === workout.exercises.length - 1)
                      return exerc.detail.name

                    return exerc.detail.name + ', '
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col flex-1 justify-center items-center gap-4">
          <div className="text-center">
            <h1 className="text-lg font-bold">
              You don't have any workouts created
            </h1>
            <p className="text-sm font-light">
              But you can create as many as you want here
            </p>
          </div>
          <Link to={'/workout/create'}>
            <Button className="cursor-pointer" size={'lg'}>
              Create
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
