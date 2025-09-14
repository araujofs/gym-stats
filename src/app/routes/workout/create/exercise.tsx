import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Check, NotebookPen, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import {
  useFormContext,
  type Control,
  type FieldArrayWithId,
  type UseFieldArrayRemove
} from 'react-hook-form'
import { type FormData } from '@/types/schemas'

export default function Exercise({
  exerciseField,
  remove
}: {
  exerciseField: {
    control: Control<FormData>
    field: FieldArrayWithId<FormData, 'exercises', 'id'>
    idx: number
  }
  remove: UseFieldArrayRemove
}) {
  const { control, field: ex, idx } = exerciseField
  const { resetField, getValues } = useFormContext<FormData>()
  const [descOpen, setDescOpen] = useState(false)
  const [descValue, setDescValue] = useState<string>('')

  return (
    <Card className="w-full h-fit">
      <CardHeader>
        <CardTitle className="text-[1.05rem]">
          {idx + 1} - {ex.name}
        </CardTitle>
        {ex.description && !descOpen && (
          <CardDescription>
            {getValues(`exercises.${idx}.description`)}
          </CardDescription>
        )}
        {descOpen && (
          <FormField
            control={control}
            name={`exercises.${idx}.description`}
            render={({ field }) => (
              <FormItem className="w-fit">
                <div className="flex flex-col gap-3 items-center">
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        )}
        <CardAction className="flex gap-2">
          {descOpen ? (
            <div className="flex gap-2">
              <Button
                type="button"
                variant={'destructive'}
                onClick={() => {
                  resetField(`exercises.${idx}.description`, {
                    defaultValue: descValue
                  })
                  setDescOpen(false)
                }}
                size={'sm'}
              >
                <X />
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setDescOpen(false)
                }}
                size={'sm'}
              >
                <Check />
              </Button>
            </div>
          ) : (
            <Tooltip delayDuration={700}>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant={'secondary'}
                  size={'sm'}
                  onClick={() => {
                    setDescValue(
                      getValues(`exercises.${idx}.description`) ?? ''
                    )
                    setDescOpen(true)
                  }}
                >
                  <NotebookPen />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Change exercise description in this workout.
              </TooltipContent>
            </Tooltip>
          )}
          {!descOpen && (
            <Button
              type="button"
              variant={'destructive'}
              size={'sm'}
              onClick={() => {
                remove(idx)
              }}
            >
              <Trash2 />
            </Button>
          )}
        </CardAction>
      </CardHeader>
      <CardContent className={`flex gap-3 justify-between items-end`}>
        <FormField
          control={control}
          name={`exercises.${idx}.sets`}
          render={({ field }) => (
            <FormItem className="w-fit">
              <div className="flex flex-col gap-3 items-center">
                <FormLabel>Sets</FormLabel>
                <FormControl>
                  <Input
                    placeholder="3"
                    {...field}
                    onChange={e => {
                      field.onChange(e.target.value !== '' ? parseInt(e.target.value) : undefined)
                    }}
                    value={field.value}
                    required
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`exercises.${idx}.reps.min`}
          render={({ field }) => (
            <FormItem className="">
              <div className="flex flex-col gap-3 items-center">
                <FormLabel className="break-words">Minimum reps</FormLabel>
                <FormControl>
                  <Input
                    placeholder="8"
                    {...field}
                    onChange={e => {
                      field.onChange(e.target.value !== '' ? parseInt(e.target.value) : undefined)
                    }}
                    value={field.value}
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`exercises.${idx}.reps.max`}
          render={({ field }) => (
            <FormItem className="">
              <div className="flex flex-col gap-3 items-center">
                <FormLabel>Maximum reps</FormLabel>
                <FormControl>
                  <Input
                    placeholder="10"
                    {...field}
                    onChange={e => {
                      field.onChange(e.target.value !== '' ? parseInt(e.target.value) : undefined)
                    }}
                    value={field.value}
                    required
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`exercises.${idx}.weight`}
          render={({ field }) => (
            <FormItem className="">
              <div className="flex flex-col gap-3 items-center">
                <FormLabel>Weight (kg)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="25.5"
                    {...field}
                    onChange={e => {
                      field.onChange(e.target.value !== '' ? parseFloat(e.target.value) : undefined)
                    }}
                    value={field.value}
                    required
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={`exercises.${idx}.rest_time`}
          render={({ field }) => (
            <FormItem className="">
              <div className="flex flex-col gap-3 items-center">
                <FormLabel>Rest (s)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="120"
                    {...field}
                    onChange={e => {
                      field.onChange(e.target.value !== '' ? parseInt(e.target.value) : undefined)
                    }}
                    value={field.value}
                    required
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}
