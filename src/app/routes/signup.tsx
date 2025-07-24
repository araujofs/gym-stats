import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { supabase as db } from '@/lib/db-client'
import { toast } from 'sonner'
import { Link, redirect } from 'react-router'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CalendarIcon, Dumbbell, Pen } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar } from '@/components/ui/calendar'

const formSchema = z.object({
  name: z.string().nonempty(),
  email: z.email(),
  password: z.string().min(8),
  birthday: z.date().max(new Date()).min(new Date('1900-01-01'))
})

export default function SignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      birthday: undefined
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { data, error } = await db.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: import.meta.env.VITE_APP_URL + '/confirmed',
        data: {
          name: values.name,
          birthday: values.birthday
        }
      }
    })

    if (error) {
      toast('Error', { description: error.message })
      console.log(error)
      return
    }

    toast('Confirme seu email!', {
      description: 'Você já pode fechar essa aba!',
      duration: 10000,
      position: 'top-center',
    })
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
          <h2>Crie sua conta!</h2>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Jonh Doe Washington" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jonh Doe Washington"
                    type="email"
                    {...field}
                  />
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
                    placeholder="Jonh Doe Washington"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Data de nascimento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP', {
                            locale: ptBR
                          })
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0" align="center">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={field.onChange}
                      disabled={date =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full !bg-[#8833df] text-[var(--foreground)] cursor-pointer" variant={'outline'}>
            <Pen /> Cadastrar
          </Button>
          <span className='text-xs'>Já tem uma conta? <Link to={'/login'} className='font-extrabold'>Entre por aqui!</Link> </span>
        </form>
      </Form>
    </div>
  )
}
