import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

function SecondaryNavigation() {
  return (
    <Button variant={'ghost'} className="px-2 text-[#888]">
      <span className="px-2"> More</span>
      <ChevronDown size={16} />
    </Button>
  )
}

export default SecondaryNavigation
