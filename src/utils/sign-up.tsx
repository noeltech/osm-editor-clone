import { useRegisterUser } from '@/services/auth'
import { useCallback, useState } from 'react'

function useSignupForm() {
  const [errors, setErrors] = useState([])
  const [serverErrors, setServerErrors] = useState([])
  const { mutate: registerUser } = useRegisterUser()
  const [formData, setFormData] = useState({
    email: '',
    confirmEmail: '',
    displayName: '',
    password: '',
    confirmPassword: ''
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
        // registerUser(data, {
        //   onError: (data) => {
        //     setServerErrors(data.errors)
        //   }
        // })
      }
    },
    [registerUser]
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
  confirmEmail: z
    .string()
    .min(1, 'Please fill out this field')
    .email('Incorrect email'),
  displayName: z.string().min(1),
  password: z.string().min(8),
  confirmPassword: z.string().min(8)
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

export { useSignupForm }
