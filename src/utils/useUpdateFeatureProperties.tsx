import {
  useCurrentSelectedAction,
  useCurrentSelectedState
} from '@/features/edit/useCurrentlySelectedFeature'
import { useEdit } from '@/features/edit/useEdit'
import { useCallback } from 'react'

function useUpdateFeatureProperties() {
  //   const currentSelectedFeature = useCurrentSelectedState()
  const setCurrentSelectedFeature = useCurrentSelectedAction()
  const { updateFeatureProperties } = useEdit()

  const update = useCallback(
    (value: string) => {
      const properties = { purpose: value }
      let featureId
      setCurrentSelectedFeature((prev) => (featureId = prev))
      updateFeatureProperties(featureId, properties)
    },
    [updateFeatureProperties, setCurrentSelectedFeature]
  )
  return update
}

export default useUpdateFeatureProperties
