import { ReactNode, useCallback } from 'react'

import { useDrawControl, useDrawControlAction } from '@/utils/useDrawControl'
import ControlButton from './ControlButton'
enum DrawModes {
  IDLE = 'simple_select',
  POINT = 'draw_point',
  LINE = 'draw_line_string',
  AREA = 'draw_polygon',
  DELETE = 'delete'
}

type DrawButtonProps = {
  drawMode?: DrawModes
  children: string
  icon?: ReactNode
  onClick?: (mode) => void
  disabled?: boolean
  className?: string
  currentMode: string
}

function DrawButton(props: DrawButtonProps) {
  // const { setControlMode } = useDrawControlAction()
  // const { currentMode } = useDrawControl()
  const buttonName = props.children
  const onClick = props.onClick
  const mode = props.drawMode as string
  const isActive = mode === props.currentMode

  const handleOnclick = useCallback(() => {
    // setControlMode(mode)
    onClick && onClick(mode)
  }, [onClick, mode])

  return (
    <ControlButton
      icon={props.icon}
      onClick={handleOnclick}
      className={props.className}
      isActive={isActive}
    >
      {buttonName}
    </ControlButton>
  )
}

export default DrawButton
