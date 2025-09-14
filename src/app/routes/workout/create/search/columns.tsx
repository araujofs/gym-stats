import { Checkbox } from '@/components/ui/checkbox'
import { type ColumnDef } from '@tanstack/react-table'

export type ExerciseSearch = {
  id: number
  name: string
  musclegroup: string
  equipment: string
}

export const columns: ColumnDef<ExerciseSearch>[] = [
  {
    id: 'select',
    header: '',
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    )
  },
  {
    accessorKey: 'name',
    header: () => <div className="font-extrabold">Name</div>
  },
  {
    accessorKey: 'musclegroup',
    header: () => <div className="font-extrabold">Muscle</div>
  },
  {
    accessorKey: 'equipment',
    header: () => <div className="font-extrabold">Equipment</div>
  }
]
