import { PanelLeftClose } from 'lucide-react'
import ControlButton from './ControlButton'
import { useSidePanelToggle } from '../MapLayoverLayout/MapLayoverLayout'

function InspectButton() {
  const toggleInspectPanel = useSidePanelToggle()
  const handleOnclick = () => {
    toggleInspectPanel((prev) => !prev)
  }
  return (
    <ControlButton
      onClick={handleOnclick}
      icon={<PanelLeftClose className="" size={20} />}
      className="onclick:bg-blue-400"
    ></ControlButton>
  )
}

export default InspectButton
