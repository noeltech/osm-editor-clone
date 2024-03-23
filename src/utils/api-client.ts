import { useAuth } from '@/services/auth'

const apiUrl = 'http://localhost:3000'

async function client(
  endpoint,
  { data, token, headers: customHeaders, ...customConfig } = {}
) {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders
    },

    ...customConfig
  }
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 204) return {}
      const data = await response.json()

      if (response.ok) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}

async function getNewToken() {
  try {
    const response = await fetch(`${apiUrl}/user/refresh-token`, {
      credentials: 'include'
    })
    const data = await response.json()
    if (response.status === 401 || response.status === 403) {
      return { success: false, token: null, message: data.message }
    }
    console.log(data.message)
    return { success: true, token: data?.data?.token, message: data.message }

    // return response.accessToken
  } catch (error) {
    console.error('Failed to refresh access token', error)
    return null
    // Handle error, e.g., log out the user
  }
}

const useAuthClient = () => {
  const { auth, setAuth } = useAuth()

  const authClient = async (
    endpoint,
    { data, token = auth.token, headers: customHeaders, ...customConfig } = {}
  ) => {
    const config = {
      method: data ? 'POST' : 'GET',
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        'Content-Type': data ? 'application/json' : undefined,
        ...customHeaders
      },
      credentials: 'include',
      ...customConfig
    }

    const response = await fetch(`${apiUrl}/${endpoint}`, config)

    if (response.status === 403) {
      // Access token expired, try to refresh it
      const result = await getNewToken()
      if (!result || result.success === false) {
        setAuth(null)
        return Promise.reject({ message: result?.message })
      }
      // SET THE AUTH CONTEXT WITH NEW TOKEN
      setAuth((prev) => ({ ...prev, token: result.token }))
      // Retry the original request with the new access token
      return authFetch(endpoint, {
        data,
        token: result.token,
        headers: customHeaders,
        ...customConfig
      })
    }

    const result = await response.json()
    if (response.ok) {
      return result
    } else {
      return Promise.reject(result)
    }
  }
  return authClient
}

async function authFetch(
  endpoint,
  { data, token, headers: customHeaders, ...customConfig } = {}
) {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders
    },
    credentials: 'include',
    ...customConfig
  }

  const response = await fetch(`${apiUrl}/${endpoint}`, config)

  if (response.status === 401) {
    // Access token expired, try to refresh it
    const result = await getNewToken()
    if (!result || result.success === false)
      return Promise.reject({ message: 'Cannot Refresh Token' })
    // Retry the original request with the new access token
    return authFetch(endpoint, {
      data,
      token: result.token,
      headers: customHeaders,
      ...customConfig
    })
  }

  const result = await response.json()
  if (response.ok) {
    return result
  } else {
    return Promise.reject(result)
  }
}

export { client, authFetch, useAuthClient }
