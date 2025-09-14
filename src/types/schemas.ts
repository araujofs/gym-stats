import { z } from 'zod'

export const exerciseSchema = z.object({
  exerciseId: z.int().positive(),
  name: z.string().nonempty(),
  weight: z
    .number()
    .positive()
    .optional()
    .refine(val => val !== undefined, { error: 'Weight must not be empty' }),
  sets: z
    .int()
    .positive()
    .optional()
    .refine(val => val !== undefined, { error: 'Sets must not be empty' }),
  reps: z
    .object({
      max: z.int().positive(),
      min: z.int().positive().optional()
    })
    .optional()
    .refine(val => val !== undefined, { error: 'Max must not be empty' }),
  description: z.string().optional(),
  rest_time: z
    .int()
    .positive()
    .optional()
    .refine(val => val !== undefined, { error: 'Rest time must not be empty' })
})

export const fullExerciseSchema = z.object({
  exerciseId: z.int().positive(),
  name: z.string().nonempty(),
  weight: z
    .number()
    .positive(),
  sets: z
    .int()
    .positive(),
  reps: z
    .object({
      max: z.int().positive(),
      min: z.int().positive().optional()
    }),
  description: z.string().optional(),
  rest_time: z
    .int()
    .positive(),
})

export const formSchema = z.object({
  name: z.string().nonempty(),
  private: z.boolean(),
  exercises: exerciseSchema.array().nonempty()
})

export const fullFormSchema = z.object({
  name: z.string().nonempty(),
  private: z.boolean(),
  exercises: exerciseSchema.array().nonempty()
})

export type FormData = z.infer<typeof formSchema>
export type ExerciseData = z.infer<typeof exerciseSchema>
