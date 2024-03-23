// import Home from '../screens/Home/Home'
import { BrowserRouter as Router } from 'react-router-dom'
// import EditMapLayout from './EditMapLayout/EditMapLayout'
// import ContextAPITest from '@/screens/playground/ContextAPITest'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import '../index.css'
import { EditProvider } from '@/features/edit/useEdit'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Routes from '@/routes/routes'
import { AuthContextProvider } from '@/services/auth'
// import TooManyConsoleLog from '@/screens/playground/TooManyConsoleLog'

const queryClient = new QueryClient()
function App() {
  return (
    <Router>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <EditProvider>
            <Routes />
          </EditProvider>
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </AuthContextProvider>
    </Router>
    // <ContextAPITest />
    // <TooManyConsoleLog />
  )
}

export default App
