import { useMutation, useQuery } from '@tanstack/react-query'
import { authFetch, client } from '@/utils/api-client'
import { useHistory } from 'react-router-dom'
import { createContext, useContext, useEffect, useState } from 'react'

const useRegisterUser = () => {
  const history = useHistory()
  return useMutation({
    mutationFn: (data) => client('user/new', { data }),
    onSuccess: (data, variables) => {
      // SET TOKEN
      // NAVIGATE TO EDIT PAGE
      history.push('/login')
    },
    onMutate: (variables) => {},
    onError: () => {}
  })
  //   const addFeature = mutation.mutate
}

const useLoginUser = () => {
  const { setAuth } = useAuth()
  const history = useHistory()
  return useMutation({
    mutationFn: (data) =>
      client('user/login', { data, credentials: 'include' }),
    onSuccess: (data, variables) => {
      // SET TOKEN

      setAuth(data.data)
      history.push('/edit')
    },
    onMutate: (variables) => {},
    onError: (err) => {
      console.log(err)
    }
  })
  //   const addFeature = mutation.mutate
}

function useLogoutUser() {
  const { setAuth } = useAuth()
  const history = useHistory()

  return useMutation({
    mutationFn: (data) => client('user/logout', { credentials: 'include' }),
    onSuccess: () => {
      setAuth(null)
      history.push('/login')
    },

    onError: (err) => {
      console.log(err)
    }
  })
}

const AuthContext = createContext(null)

function AuthContextProvider({ children }) {
  const [auth, setAuth] = useState<object | null>()
  const value = { auth, setAuth }

  useEffect(() => {
    return () => setAuth(null)
  }, [])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside a useAuthProvider')
  return context
}

export {
  useRegisterUser,
  useLoginUser,
  useAuth,
  AuthContextProvider,
  useLogoutUser
}
