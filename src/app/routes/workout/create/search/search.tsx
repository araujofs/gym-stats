import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { supabase as db } from '@/lib/db-client'
import { toast } from 'sonner'
import DataTable from './data-table'
import { columns, type ExerciseSearch } from './columns'

export default function SearchExercises({
  setSelectedExercises
}: {
  setSelectedExercises: (exercises: ExerciseSearch[]) => void
}) {
  const [exercises, setExercises] = useState<ExerciseSearch[]>([])
  let timeoutId: ReturnType<typeof setTimeout> | null

  function handleChange(value: string) {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    
    if (value === '') setExercises([])
    
    timeoutId = setTimeout(() => {
      fetchExercises(value)
    }, 1000)
  }

  function fetchExercises(value: string) {
    db.from('exercise')
      .select(
        `
        id,
        name,
        equipment (
          name
        ),
        muscle_group (
          name
        )
        `
      )
      .textSearch('name', value, {
        type: 'websearch',
        config: 'english'
      })
      .then(({ data, error }) => {
        if (error || data == null) {
          toast('Error', {
            description: error.message
          })
          return
        }

        setExercises(
          data.map((ex: any) => ({
            id: ex.id,
            name: ex.name,
            equipment: ex.equipment.name,
            musclegroup: ex.muscle_group[0].name
          })) ?? []
        )
      })
  }

  return (
    <div className="flex flex-col flex-1 gap-4">
      <Input
        className="w-2/5 h-8 rounded"
        onChange={e => {
          handleChange(e.target.value)
        }}
        placeholder="Search exercises..."
      />
      <DataTable
        columns={columns}
        data={exercises}
        setSelected={setSelectedExercises}
      />
    </div>
  )
}
