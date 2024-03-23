// import { useCallback } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { featureType } from '../../components/SIdeBar/components/FeatureTypeSelectionPanel/data'
import { FeatureTypeListItem } from '../../components/SIdeBar/components/FeatureTypeSelectionPanel/components/FeatureTypeButton'
import { useEdit } from '@/features/edit/useEdit'
import { useCurrentSelectedState } from '@/features/edit/useCurrentlySelectedFeature'
import ButtonsTest from './buttonsTest'
// import { useCurrentlySelected, useEdit } from '@/features/edit/useEdit'

// type featureProperty = {
//   property: string
//   value: any
// } | null

// type FeatureTypeListProps = {
//   onSelect: (event: object) => void
//   selected?: object | null
// }

export default function FeatureTypeList() {
  const [name, setName] = useState('')
  const handleOnSelect = useCallback(() => {}, [])
  // (value: string | undefined) => {
  //   const properties = { purpose: value }

  //   updateFeatureProperties(properties)
  // },
  // [updateFeatureProperties]
  // const propertyName = getFeatureProperty(currentSelectedFeature)
  // console.log(propertyName)
  const selectedType = name
  console.log('too many render')
  useEffect(() => {
    console.log('featureList rerendered')
  })

  return (
    <div>
      <ButtonsTest onSelectChange={setName} />

      <ul>
        <List
          data={featureType}
          selected={selectedType}
          onSelectChange={handleOnSelect}
        />
      </ul>
    </div>
  )
}

interface IList {
  data: object[]
  selected?: string
  onSelectChange: () => void
}
const renderlist = 0
function List({ data, selected, onSelectChange }: IList) {
  // console.log(renderlist++)
  return (
    <>
      {data?.map((item) => {
        // const isSelected = item.name === selected
        return (
          <FeatureTypeListItem
            key={item.id}
            name={item.name}
            iconName={item.icon}
            info={item.info}
            onClick={onSelectChange}
            // isSelected={isSelected}
          />
        )
      })}
    </>
  )
}
