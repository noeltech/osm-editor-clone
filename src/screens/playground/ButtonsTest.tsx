import { featureType } from '@/components/SIdeBar/components/FeatureTypeSelectionPanel/data'
import { Button } from '@/components/ui/button'
import { memo, useCallback, useEffect } from 'react'
const adds = [{ name: '' }, { name: 'asdasd' }, { name: null }]
function ButtonsTest({ onSelectChange }) {
  const handleOnClick = useCallback(
    (name) => {
      onSelectChange(name)
    },
    [onSelectChange]
  )
  useEffect(() => {
    console.log('buttons rendered')
  })

  return (
    <div>
      {adds.map((item) => {
        return (
          <ButtonItem
            key={item.name}
            name={item.name}
            onClick={handleOnClick}
          />
        )
      })}
      {featureType.map((item) => {
        return (
          <ButtonItem
            key={item.name}
            name={item.name}
            onClick={handleOnClick}
          />
        )
      })}
    </div>
  )
}

export default memo(ButtonsTest)

function ButtonItem({ name, onClick }) {
  return (
    <Button
      onClick={() => {
        onClick(name)
      }}
    >
      {name}
    </Button>
  )
}
