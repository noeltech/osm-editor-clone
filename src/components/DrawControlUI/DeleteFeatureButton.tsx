import {
  useCurrentSelectedAction,
  useCurrentSelectedState
} from '@/features/edit/useCurrentlySelectedFeature'

import { Trash } from 'lucide-react'
import { useEdit } from '@/features/edit/useEdit'
import { useCallback, useEffect } from 'react'
import { useDrawControl } from '@/utils/useDrawControl'
import ControlButton from './ControlButton'

function DeleteFeatureButton() {
  const currentSelectedFeature = useCurrentSelectedState()
  const setCurrentSelectedFeature = useCurrentSelectedAction()
  const { control } = useDrawControl()
  const { onDelete } = useEdit()

  const handleDeleteFeature = useCallback(() => {
    if (currentSelectedFeature) {
      //Should be one source of truth
      // should only be delete call
      onDelete(currentSelectedFeature)
      control && control.delete(currentSelectedFeature)
      setCurrentSelectedFeature(null)
    }
  }, [onDelete, currentSelectedFeature, control])

  const selected = currentSelectedFeature === null

  return (
    <ControlButton
      isActive={false}
      onClick={handleDeleteFeature}
      icon={<Trash className=" h-4 w-4" />}
      disabled={selected}
      className={`bg-red-400 hover:bg-red-700`}
    />
  )
}

export default DeleteFeatureButton
