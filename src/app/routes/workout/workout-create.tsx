import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import z from 'zod'

export const handle = {
  breadcrumb: 'Create'
}

const formSchema = z.object({
  name: z.string().nonempty(),
  private: z.boolean(),
  exercises: z
    .object({
      id: z.int().min(1),
      weight: z.number().min(1),
      sets: z.int().min(1),
      max_reps: z.int().min(1),
      min_reps: z.int().min(1),
      description: z.string().optional(),
      rest_time: z.int().min(1).optional()
    })
    .array()
    .nonempty()
})

export default function WorkoutCreate() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      private: true,
      exercises: []
    }
  })

  return (
    <Form {...form}>
      <form className="flex-1 flex flex-col items-center gap-4 p-4">
        <div className='w-full font-bold'>
          <h1>New Workout</h1>
        </div>

        <div className="w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <Card className="w-full">
                  <CardContent>
                    <div className='flex flex-col gap-3'>
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

        <div className="w-full flex-1">
          <Card className='h-full'>
            <CardHeader>
              <CardTitle>Exercises</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-1 justify-center'>
              <div className='flex flex-1 justify-center rounded border-3 border-dashed items-center'>
                <Button size={'lg'}>Add exercise</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='flex gap-2 w-full justify-end'>
          <Button size={'lg'} variant={'destructive'}>Clear</Button>
          <Button size={'lg'}>Create</Button>
        </div>
      </form>
    </Form>
  )
}
