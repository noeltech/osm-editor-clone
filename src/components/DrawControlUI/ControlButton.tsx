import { ReactNode, useCallback } from 'react'
import { Button } from '../ui/button'

type DrawButtonProps = {
  isActive?: boolean
  children?: string | ReactNode
  icon?: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

function ControlButton(props: DrawButtonProps) {
  const buttonName = props.children
  const onClick = props.onClick
  const handleOnclick = useCallback(() => {
    onClick && onClick()
  }, [onClick])

  return (
    <Button
      variant={'ghost'}
      className={`bg-white p-3 text-xs ${
        props.isActive
          ? ' bg-blue-500 text-white hover:cursor-not-allowed hover:bg-blue-500 hover:text-white'
          : ''
      }${props.className && props.className}`}
      onClick={handleOnclick}
      disabled={props.disabled}
    >
      {props.icon}
      {buttonName}
    </Button>
  )
}

export default ControlButton
