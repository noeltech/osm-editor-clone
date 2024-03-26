import { useDrawControl, useDrawControlAction } from '@/utils/useDrawControl'
import { FeatureTypeListItem } from './FeatureTypeButton'

export default function FeatureTypeList({ selected }) {
  const { updateFeature, setSelectedFeature } = useDrawControlAction()
  const { newFeatures } = useDrawControl()
  const { addHistory } = useEditHistory()
  const { properties, id } = selected

  const onSelectChange = (name) => {
    updateFeature(id, 'featureType', name)
    const newProp = { ...properties, featureType: name }

    const updatedFeature = { ...selected, properties: newProp }
    setSelectedFeature(updatedFeature)

    if (newFeatures.includes(id)) return
    // OTHERWISE GENERATE A NEW HISTORY
    const updates = {
      id,
      type: 'properties',
      value: newProp,
      updated_by: 'temp_id'
    }
    addHistory('update', updates)
  }
  const selectedType = properties.featureType

  return (
    <>
      <List
        data={featureType}
        selected={selectedType}
        id={id}
        onSelectChange={onSelectChange}
      />
    </>
  )
}

interface IList {
  data: object[]
  selected?: string
  onSelectChange?: (name) => void
  id: string
}

function List({ data, selected, id, onSelectChange }: IList) {
  // const { updateFeature } = useNewFeatures()
  const handleOnSelectChange = async (name) => {
    // updateFeature(id, { featureType: name }, 'properties')
    onSelectChange && onSelectChange(name)
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
import { useEditHistory } from '@/utils/edit-history'

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
