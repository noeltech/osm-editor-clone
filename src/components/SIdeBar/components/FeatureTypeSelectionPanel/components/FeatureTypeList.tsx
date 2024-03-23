import { FeatureTypeListItem } from './FeatureTypeButton'
import { useCurrentSelectedState } from '@/features/edit/useCurrentlySelectedFeature'
import { useNewFeatures } from '@/utils/temp-feature'

export default function FeatureTypeList() {
  const currentSelectedFeature = useCurrentSelectedState()
  const selected = currentSelectedFeature?.properties.featureType
    ? currentSelectedFeature?.properties.featureType
    : 'Generic'
  const id = currentSelectedFeature ? currentSelectedFeature.id : ''
  console.log(currentSelectedFeature)
  return (
    <>
      <List
        data={featureType}
        selected={selected}
        id={id}
        // onSelectChange={() => {}}
      />
    </>
  )
}

interface IList {
  data: object[]
  selected?: string
  // onSelectChange?: () => void
  id: string
}

function List({ data, selected, id }: IList) {
  const { updateFeature } = useNewFeatures()
  const handleOnSelectChange = async (name) => {
    updateFeature(id, { featureType: name }, 'properties')
  }
  return (
    <ul className="">
      {data?.map((item) => {
        const isSelected = item.name === selected

        return (
          <FeatureTypeListItem
            key={item.id}
            name={item.name}
            icon={item.icon}
            info={item.info}
            onClick={handleOnSelectChange}
            id={id}
            isSelected={isSelected}
          />
        )
      })}
    </ul>
  )
}

import {
  CoffeeIcon,
  ChurchIcon,
  UtensilsIcon,
  TreePineIcon,
  CrossIcon,
  SandwichIcon,
  CircleDollarSignIcon,
  MapIcon
} from 'lucide-react'

export const featureType = [
  { id: 'cafe', name: 'Cafe', icon: <CoffeeIcon />, info: 'Cafe' },
  {
    id: 'placeofworship',
    name: 'Place of Worship',
    icon: <ChurchIcon />,
    info: 'Place of Worship'
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    icon: <UtensilsIcon />,
    info: 'Restaurant'
  },
  { id: 'park', name: 'Park', icon: <TreePineIcon />, info: 'Park' },
  {
    id: 'hospitalgrounds',
    name: 'Hospital Grounds',
    icon: <CrossIcon />,
    info: 'Hospital Grounds'
  },
  {
    id: 'fastfoods',
    name: 'Fast Foods',
    icon: <SandwichIcon />,
    info: 'Fast Foods'
  },
  { id: 'bank', name: 'Bank', icon: <CircleDollarSignIcon />, info: 'Bank' },
  { id: 'generic', name: 'Generic', icon: <MapIcon />, info: 'Generic' }
]

export function getFeatureButton(name: string) {
  const item = featureType.find((item) => item.name === name)
  return (
    <FeatureTypeListItem
      key={item.id}
      name={item.name}
      icon={item.icon}
      info={item.info}
      onClick={() => {}}
      isSelected={false}
    />
  )
}
