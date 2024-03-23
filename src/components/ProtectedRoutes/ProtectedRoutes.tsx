import { useAuth } from '@/services/auth'
import { Route, Redirect } from 'react-router-dom'

export default function ProtectedRoutes({ children, ...rest }) {
  const { auth } = useAuth()

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  )
}
