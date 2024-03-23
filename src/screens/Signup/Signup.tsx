import AppBar from '@/components/AppBar/AppBar'
import { Button } from '@/components/ui/button'

import * as Form from '@radix-ui/react-form'
import { useSignupForm } from '@/utils/sign-up'

export default function Signup() {
  const {
    handleInputChange,
    formData,
    handleSubmit,
    onInputFocus,
    errors,
    serverErrors
  } = useSignupForm()

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
            <Form.Label>Email </Form.Label>
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
            <ServerErrorMessage errors={serverErrors} inputName="email" />
          </Form.Field>
          {/* EMAIL CONFIRMATION */}
          <Form.Field name="confirmEmail" className="mb-6 flex flex-col">
            <Form.Label aria-describedby="email-info">
              Email Confirmation
            </Form.Label>
            <Form.Control asChild>
              <input
                type="text"
                className={style.input}
                value={formData.confirmEmail}
                onChange={handleInputChange}
                onFocus={onInputFocus}
              />
            </Form.Control>
            <InputErrorMessage errors={errors} inputName="confirmEmail" />
            <ServerErrorMessage
              errors={serverErrors}
              inputName="confirmEmail"
            />
            <Form.Message className="text-xs text-gray-500">
              Your address is not displayed publicly, see our privacy policy for
              more information
            </Form.Message>
          </Form.Field>
          {/* DISPLAY NAME */}
          <Form.Field name="displayName" className="mb-6 flex flex-col">
            <Form.Label>Display Name</Form.Label>
            <Form.Control asChild>
              <input
                type="text"
                className={style.input}
                value={formData.displayName}
                onChange={handleInputChange}
                onFocus={onInputFocus}
              />
            </Form.Control>
            <InputErrorMessage errors={errors} inputName="displayName" />
            <ServerErrorMessage errors={serverErrors} inputName="displayName" />
            <Form.Message className="text-xs text-gray-500">
              Your Publicly displayed username. You can change this later in the
              preferences
            </Form.Message>
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
          {/* CONFIRM PASSWORD */}
          <Form.Field name="confirmPassword" className="mb-6 flex flex-col">
            <Form.Label>Confirm Password </Form.Label>
            <Form.Control asChild>
              <input
                type="password"
                className={style.input}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onFocus={onInputFocus}
              />
            </Form.Control>
            <InputErrorMessage errors={errors} inputName="confirmPassword" />
            <ServerErrorMessage
              errors={serverErrors}
              inputName="confirmPassword"
            />
          </Form.Field>
          <Form.Submit asChild>
            <Button className="bg-blue-500">Sign Up</Button>
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

  const error = errors?.find((item) => item.path === inputName)

  if (!error) return

  return (
    <Form.Message className="text-xs text-red-500">{error.msg}</Form.Message>
  )
}
