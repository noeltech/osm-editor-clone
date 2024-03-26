import { Button } from '@/src/components/ui/button'
import { useDrawControlAction } from '@/utils/useDrawControl'
import { CopyIcon, MoveIcon, Trash2Icon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Popup } from 'react-map-gl'
function FeatureContextMenu({ contextMenuInfo, onClose }) {
  const { deleteFeature } = useDrawControlAction()
  const popupRef = useRef<mapboxgl.Popup>(null)
  useEffect(() => {
    console.log(popupRef.current)
  }, [contextMenuInfo])
  if (!contextMenuInfo) return null
  const { lng, lat } = contextMenuInfo
  const handleOnDelete = () => {
    deleteFeature()
    onClose(null)
  }
  return (
    <Popup
      anchor="left"
      longitude={Number(lng)}
      latitude={Number(lat)}
      onClose={() => onClose(null)}
      closeButton={false}
    >
      <div className="absolute inset-0 h-fit w-fit rounded-sm bg-white">
        <Button
          variant="ghost"
          className="w-9 rounded-none p-0 hover:rounded-none hover:bg-gray-200"
          disabled
        >
          <CopyIcon size={20} />
        </Button>
        <Button
          variant="ghost"
          className="w-9 rounded-none p-0 hover:rounded-none hover:bg-gray-200"
          disabled
        >
          <MoveIcon size={20} />
        </Button>
        <Button
          variant="ghost"
          className="w-9 rounded-none p-0 hover:rounded-none hover:bg-gray-200"
          onClick={handleOnDelete}
        >
          <Trash2Icon size={20} />
        </Button>
      </div>
    </Popup>
  )
}

export default FeatureContextMenu
