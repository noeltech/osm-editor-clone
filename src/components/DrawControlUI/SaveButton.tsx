import { useFeatures } from '@/utils/edit-temp-feature'
import ControlButton from './ControlButton'
import { UploadIcon } from 'lucide-react'
function SaveButton({ onClick, data }) {
  // const { data } = useFeatures()
  const featureCount = data?.length
  const isDisabled = data?.length >= 1 ? false : true
  return (
    <ControlButton
      onClick={onClick}
      icon={<UploadIcon className="mr-2 h-4 w-4" />}
      disabled={isDisabled}
    >
      <span className="px-2 text-sm">{featureCount}</span>
    </ControlButton>
  )
}

export default SaveButton
