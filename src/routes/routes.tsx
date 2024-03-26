import { Switch, Route } from 'react-router-dom'

import Home from '@/screens/Home/Home'
import Edit from '@/screens/Edit/Edit'
import Signup from '@/screens/Signup/Signup'
import Login from '@/screens/Login/Login'
import ProtectedRoutes from '@/components/ProtectedRoutes/ProtectedRoutes'

export default function Routes() {
  return (
    <>
      <Switch>
        <Route path="/edit">
          <Edit />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>

        {/* <ProtectedRoutes path="/edit">
          <Edit />
        </ProtectedRoutes> */}

        <Route path="/">
          <Edit />
        </Route>
      </Switch>
    </>
  )
}
