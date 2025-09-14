import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useIsMobile } from '@/hooks/use-mobile'
import { useFieldArray, useWatch, type Control } from 'react-hook-form'
import Exercise from '~/routes/workout/create/exercise'
import SearchExercises from '~/routes/workout/create/search/search'
import { useMemo, useRef, useState } from 'react'
import type { ExerciseSearch } from '~/routes/workout/create/search/columns'
import { Check, Loader, X } from 'lucide-react'
import { fullFormSchema, type ExerciseData, type FormData } from '@/types/schemas'

export default function Exercises({
  control,
  clear
}: {
  control: Control<FormData>
  clear: () => void
}) {
  const {
    fields: exercises,
    append,
    remove
  } = useFieldArray({
    control: control,
    name: 'exercises'
  })
  const watching = useWatch({ control })
  const [isSearching, setIsSearching] = useState(false)
  const isMobile = useIsMobile()
  const selectedExercises = useRef<ExerciseData[]>([])

  const customIsValid = useMemo(() => {
    const result = fullFormSchema.safeParse(watching)
    return result.success
  }, [watching])

  function setSelectedExercises(exercises: ExerciseSearch[]) {
    selectedExercises.current = exercises.map(ex => ({
      exerciseId: ex.id,
      name: ex.name
    }))
  }

  function handleConfirmExercisesClick() {
    selectedExercises.current.map(ex => {
      append({
        exerciseId: ex.exerciseId,
        name: ex.name
      })
    })
    setIsSearching(false)
  }

  const empty = exercises.length === 0

  return (
    <Card className="flex-1 h-full max-h-full flex flex-col pb-3">
      <CardHeader className="flex-shrink-0">
        <CardTitle>Exercises</CardTitle>
        {!isMobile && (
          <CardDescription>
            Add exercises to your workout. Define the sets, weight, minimum and
            maximum reps, rest time (after the set) and a description.
          </CardDescription>
        )}
        <CardAction>
          {!empty && !isSearching && (
            <Button
              type="button"
              onClick={() => {
                setIsSearching(true)
              }}
            >{`Add ${!isMobile ? ' exercise' : ''}`}</Button>
          )}

          {isSearching && (
            <div className="flex gap-2">
              <Button
                type="button"
                variant={'destructive'}
                size={'sm'}
                onClick={() => {
                  selectedExercises.current = []
                  setIsSearching(false)
                }}
              >
                <X />
              </Button>
              <Button
                type="button"
                size={'sm'}
                onClick={handleConfirmExercisesClick}
              >
                <Check />
              </Button>
            </div>
          )}
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 gap-3 overflow-y-hidden items-center">
        <div
          className={`flex flex-col flex-1 w-full gap-3 overflow-y-auto ${
            empty &&
            !isSearching &&
            'rounded-lg border-3 border-dashed items-center justify-center'
          }`}
        >
          {empty && !isSearching && (
            <div className="flex flex-col items-center gap-4">
              <div className="flex flex-col items-center">
                <h1 className="text-lg font-semibold">Your workout is empty</h1>
                <p className="text-sm text-gray-400">
                  Start searching some exercises and adding them
                </p>
              </div>
              <Button
                size={'lg'}
                type="button"
                onClick={() => {
                  setIsSearching(true)
                }}
              >
                Add exercise
              </Button>
            </div>
          )}

          {isSearching ? (
            <SearchExercises setSelectedExercises={setSelectedExercises} />
          ) : (
            exercises.map((ex, idx) => (
              <Exercise
                exerciseField={{ control, field: ex, idx }}
                remove={remove}
                key={ex.id}
              />
            ))
          )}
        </div>
        {!isSearching && (
          <div className="flex gap-2 w-full justify-end h-fit">
            <Button
              size={'lg'}
              variant={'destructive'}
              type="button"
              onClick={clear}
              disabled={control._formState.isSubmitting}
            >
              Clear
            </Button>
            <Button
              size={'lg'}
              type="submit"
              disabled={
                control._formState.isSubmitting || !customIsValid
              }
            >
              {control._formState.isSubmitting && (
                <Loader className="animate-spin" />
              )}
              Create
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
