import { useCurrentSelectedState } from '@/features/edit/useCurrentlySelectedFeature'
import { useEdit } from '@/features/edit/useEdit'
import { useEffect, useState } from 'react'
import { useDrawControlAction } from './useDrawControl'

function useFeatureType() {
  const [featureType, setFeatureType] = useState<string>('')
  //   const setCurrentSelectedFeature = useCurrentSelectedAction()
  const currentSelectedFeature = useCurrentSelectedState()

  useEffect(() => {
    if (currentSelectedFeature) {
      const featureType = currentSelectedFeature.properties.featureType

      setFeatureType(featureType ? featureType : 'Generic')
    } else {
      setFeatureType('')
    }
  }, [currentSelectedFeature])

  return featureType
}

export default useFeatureType
