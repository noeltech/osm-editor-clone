import { useFeatures } from '@/utils/edit-temp-feature'
import ControlButton from './ControlButton'
import { UploadIcon } from 'lucide-react'
function SaveButton() {
  const { data } = useFeatures()
  const featureCount = data?.length
  return (
    <ControlButton icon={<UploadIcon className="mr-2 h-4 w-4" />}>
      <span className="px-2 text-sm">{featureCount}</span>
    </ControlButton>
  )
}

export default SaveButton
