import {
  type RouteConfig,
  index,
  layout,
  route
} from '@react-router/dev/routes'

export default [
  route('login', 'routes/auth/login.tsx', { id: 'Login' }),
  route('signup', 'routes/auth/signup.tsx', { id: 'Signup' }),
  route('confirmed', 'routes/confirmed.tsx', { id: 'Confirmed' }),
  layout('layouts/protected-route.tsx', [
    layout('layouts/layout.tsx', [
      index('routes/home.tsx', {
        id: 'Home'
      }),
      route('workout', 'routes/workout/workout.tsx', { id: 'Workout' }, [
        route('create', 'routes/workout/create/workout-create.tsx', { id: 'Workout-Create' })
      ])
    ])
  ])
] satisfies RouteConfig
