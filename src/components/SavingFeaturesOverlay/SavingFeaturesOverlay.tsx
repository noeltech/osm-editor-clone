// import * as Dialog from '@radix-ui/react-dialog'
import { useIsMutating } from '@tanstack/react-query'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
const SavingFeaturesOverlay = () => {
  const isMutating = useIsMutating({ mutationKey: ['saved-features'] })

  const isOpen = isMutating == 1 ? true : false

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Uploading Changes to OpenstreetMapClone...</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default SavingFeaturesOverlay
