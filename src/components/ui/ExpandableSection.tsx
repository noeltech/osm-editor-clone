import * as Collapsible from '@radix-ui/react-collapsible'
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'
import { ReactNode, useState } from 'react'

interface IExpandableSection {
  children: ReactNode
  label: string
}

function ExpandableSection({ children, label }: IExpandableSection) {
  const [open, setOpen] = useState(true)

  const ButtonIcon = open ? (
    <ChevronDownIcon size={22} />
  ) : (
    <ChevronRightIcon size={22} />
  )
  return (
    <Collapsible.Root open={open} onOpenChange={setOpen} className="mb-8">
      <Collapsible.Trigger asChild>
        <button className="mb-3 flex font-semibold text-blue-400 hover:text-blue-500">
          <span className="mr-2">{ButtonIcon}</span>
          <span className="text-sm">{label}</span>
        </button>
      </Collapsible.Trigger>
      <Collapsible.Content>{children}</Collapsible.Content>
    </Collapsible.Root>
  )
}

export default ExpandableSection
