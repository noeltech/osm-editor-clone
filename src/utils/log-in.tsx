import { useLoginUser } from '@/services/auth'
import { useCallback, useState } from 'react'

function useLoginForm() {
  const [errors, setErrors] = useState([])
  const [serverErrors, setServerErrors] = useState([])
  const { mutate: loginUser } = useLoginUser()
  const [formData, setFormData] = useState({
    email: 'noelbajande@gmail.com',
    password: 'qwertyui'
  })
  const handleInputChange = useCallback((event) => {
    const { name, value } = event.currentTarget
    setFormData((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = useCallback(
    (event: React.SyntheticEvent) => {
      event.preventDefault()
      const data = Object.fromEntries(
        new FormData(event.target as HTMLFormElement)
      )
      // CLIENT SIDE FORM DATA VALIDATION
      const { success, errors } = validateSignUpForm(data)
      if (!success) {
        setErrors(errors)
      } else {
        console.log(data)
        loginUser(data, {
          onError: (data) => {
            console.log(data)
            setServerErrors([data])
          }
        })
      }
    },
    [loginUser]
  )

  const onInputFocus = useCallback(
    (event) => {
      const name = event.currentTarget.name
      if (errors.length <= 0) return
      if (errors[0].type === name) {
        setErrors([])
      }
    },
    [errors]
  )

  return {
    handleInputChange,
    formData,
    handleSubmit,
    onInputFocus,
    errors,
    serverErrors
  }
}

import { z } from 'zod'
const inputSchema = z.object({
  email: z
    .string()
    .min(1, 'Please fill out this field')
    .email('Incorrect email'),
  password: z.string().min(8, 'Password must at least 8 characters long')
})

export default function validateSignUpForm(data) {
  const result = inputSchema.safeParse(data)

  if (!result.success) {
    const errors = JSON.parse(result.error)
    const { path, message } = errors[0]
    const error = [{ type: path[0], message: message }]
    return { success: false, errors: error }
  }

  return { success: true, errors: [] }
}

export { useLoginForm }
