import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { supabase as db } from '@/lib/db-client'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Dumbbell, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
})

export default function Login() {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data, error } = await db.auth.signInWithPassword({
      email: values.email,
      password: values.password
    })

    if (error) {
      toast('Error', { description: error.message })
      return
    }

    navigate('/')
  }

  return (
    <div className="flex-1 flex justify-center items-center">
      <Form {...form}>
        <form
          className="flex flex-col gap-5 items-center rounded p-6 w-sm bg-[var(--card)] shadow-[inset_0_8px_2px_-4px_var(--accent)]"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="bg-[#8833df] text-sidebar-primary-foreground flex aspect-square size-12 items-center justify-center rounded-lg">
            <Dumbbell size={42} />
          </div>
          <h2>Bem-vindo!</h2>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full !bg-[#8833df] text-[var(--foreground)] cursor-pointer" variant={'outline'}>
            <Send /> Entrar
          </Button>
          <span className='text-xs'>Ainda não criou sua conta? <Link to={'/signup'} className='font-extrabold'>Crie aqui!</Link> </span>
        </form>
      </Form>
    </div>
  )
}
