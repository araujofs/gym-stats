import {
  type RouteConfig,
  index,
  layout,
  route
} from '@react-router/dev/routes'

export default [
  route('login', 'routes/login.tsx', { id: 'Login' }),
  route('signup', 'routes/signup.tsx', { id: 'Signup' }),
  route('confirmed', 'routes/confirmed.tsx', { id: 'Confirmed' }),
  layout('layouts/protected-route.tsx', [
    layout('layouts/layout.tsx', [
      index('routes/home.tsx', {
        id: 'Home'
      })
    ])
  ])
] satisfies RouteConfig
