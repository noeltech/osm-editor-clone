import { Button } from '@/components/ui/button'

import { InfoIcon } from 'lucide-react'

import { memo } from 'react'

type FeatureTypeButtonProps = {
  name?: string
  icon: unknown
  info: string
  onClick?: (name: string) => void
  isSelected?: boolean
  id: string
}

function FeatureTypeButton(props: FeatureTypeButtonProps) {
  const handleOnClick = () => {
    props.onClick && props.onClick(props.name)
  }

  return (
    <li className="mb-[10px] h-[60px] list-none ">
      <div className="flex items-center divide-x divide-solid overflow-hidden rounded-sm border border-solid border-gray-300 bg-gray-100 text-xs">
        <Button
          variant="ghost"
          className={`h-max grow p-0 ${
            props.isSelected && 'bg-blue-100'
          } hover:bg-gray-200`}
          onClick={handleOnClick}
        >
          <div className=" flex  grow  items-stretch">
            <div
              className={` border-r border-gray-300  p-4 ${
                props.isSelected ? 'bg-blue-100' : 'bg-white'
              } `}
            >
              {props.icon}
            </div>

            <div className=" flex grow items-center  border-r border-gray-300 pl-4 text-left">
              <span className=" text-xs">{props.name}</span>
            </div>
          </div>
        </Button>
        <Button variant="ghost" className="box-border flex h-full p-0">
          <span className="p-2 text-gray-400">
            <InfoIcon size={20} />
          </span>
        </Button>
      </div>
    </li>
  )
}

export const FeatureTypeListItem = memo(FeatureTypeButton)
