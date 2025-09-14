import { Card, CardContent } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { supabase as db } from '@/lib/db-client'
import { useAuth } from '@/providers/auth-context'
import { toast } from 'sonner'
import { formSchema, type FormData } from '@/types/schemas'
import Exercises from './exercises'
import { Switch } from '@/components/ui/switch'
import { useEffect } from 'react'
import { Eye, EyeClosed } from 'lucide-react'

export const handle = {
  breadcrumb: 'Create'
}

export default function WorkoutCreate() {
  const { user } = useAuth()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      private: true,
      exercises: []
    },

    mode: 'onSubmit'
  })

  useEffect(() => {
    form.reset()
  }, [form.formState.isSubmitSuccessful])

  async function onSubmit(data: FormData) {
    const userId = await db
      .from('users')
      .select('id')
      .eq('uid', user?.id)
      .then(val => {
        if (val.error) {
          toast('Error', {
            description: val.error?.message
          })
          return
        }

        return val.data[0].id
      })

    const workoutId = await db
      .from('workout')
      .insert({
        user_id: userId,
        name: data.name,
        private: data.private
      })
      .select()
      .then(val => {
        if (val.error) {
          toast('Error', {
            description: val.error?.message
          })
          return
        }
        return val.data[0].id
      })

    await db
      .from('planned_exercise')
      .insert(
        data.exercises.map(exercise => ({
          exercise_id: exercise.exerciseId,
          workout_id: workoutId,
          weight: exercise.weight,
          sets: exercise.sets,
          max_reps: exercise.reps?.max,
          min_reps: exercise.reps?.min,
          description: exercise.description,
          rest_time: exercise.rest_time
        }))
      )
      .then(val => {
        if (val.error) {
          toast('Error', {
            description: val.error?.message
          })
          return
        }
      })

    form.reset()
  }

  function clear() {
    form.reset()
  }

  return (
    <Form {...form}>
      <form
        className="h-full flex-1 flex flex-col gap-3 p-2 overflow-y-hidden"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="w-full flex justify-between h-fit font-bold">
          <h1>New Workout</h1>
          <FormField
            control={form.control}
            name="private"
            render={({ field }) => (
              <FormItem className="w-fit">
                <div className="flex items-center gap-3">
                  <FormLabel>Private</FormLabel>
                  <FormControl>
                    <Switch
                      onCheckedChange={field.onChange}
                      checked={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="w-full h-fit">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <Card className="w-full">
                  <CardContent>
                    <div className="flex flex-col gap-3">
                      <FormLabel>Workout name</FormLabel>
                      <FormControl>
                        <Input placeholder="Pull workout" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </CardContent>
                </Card>
              </FormItem>
            )}
          />
        </div>

        <div className="flex-1 w-full">
          <Exercises control={form.control} clear={clear} />
        </div>
      </form>
    </Form>
  )
}
