export interface WorkoutExercise {
  description: string | null
  detail: {
    name: string,
    equipment: {
      name: string
    }
    target_muscles: {
      muscle: {
        name: string
      }
    }[]
    exercise_id: number
    id: number
    max_reps: number
    min_reps: number
    rest_time: number
    sets: number
    weight: number
    workout_id: number
  }
}

export interface Workout {
  id: number
  name: string
  private: boolean
  exercises: WorkoutExercise[]
}
