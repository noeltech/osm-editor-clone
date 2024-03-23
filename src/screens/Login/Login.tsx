import AppBar from '@/components/AppBar/AppBar'
import { Button } from '@/components/ui/button'

import * as Form from '@radix-ui/react-form'
import { useLoginForm } from '@/utils/log-in'

export default function Login() {
  const {
    handleInputChange,
    formData,
    handleSubmit,
    onInputFocus,
    errors,
    serverErrors
  } = useLoginForm()

  const style = {
    input: 'rounded-md border border-gray-300 px-3 py-1.5 text-base mb-2'
  }

  return (
    <div>
      <AppBar />
      <div className="p-6">
        <Form.Root onSubmit={handleSubmit}>
          {/* EMAIL */}
          <Form.Field name="email" className="mb-6 flex flex-col">
            <Form.Label>Email or Username </Form.Label>
            <Form.Control asChild>
              <input
                type="text"
                className={style.input}
                value={formData.email}
                onChange={handleInputChange}
                onFocus={onInputFocus}
              />
            </Form.Control>
            <InputErrorMessage errors={errors} inputName="email" />
          </Form.Field>

          {/* PASSWORD */}
          <Form.Field name="password" className="mb-6 flex flex-col">
            <Form.Label>Password </Form.Label>
            <Form.Control asChild>
              <input
                type="password"
                className={style.input}
                value={formData.password}
                onChange={handleInputChange}
                onFocus={onInputFocus}
              />
            </Form.Control>
            <InputErrorMessage errors={errors} inputName="password" />
            <ServerErrorMessage errors={serverErrors} inputName="password" />
          </Form.Field>

          <Form.Submit asChild>
            <Button className="bg-blue-500">Log In</Button>
          </Form.Submit>
        </Form.Root>
      </div>
    </div>
  )
}

function InputErrorMessage({ errors, inputName }) {
  if (errors?.length <= 0) return
  if (!errors[0] || errors[0].type != inputName) return
  const message = errors[0].message

  return <Form.Message className="text-xs text-red-500">{message}</Form.Message>
}

function ServerErrorMessage({ errors, inputName }) {
  if (errors?.length <= 0) return
  console.log(errors)
  const error = errors[0]

  if (!error) return

  return (
    <Form.Message className="text-xs text-red-500">
      {error.message}
    </Form.Message>
  )
}
