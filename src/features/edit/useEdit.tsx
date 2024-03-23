import * as React from 'react'
import type { DrawFeature } from '@mapbox/mapbox-gl-draw'
import { useLocalStorage } from 'usehooks-ts'
import { useAddFeature } from '@/utils/edit-temp-feature'

const EditContext = React.createContext<EditContextType | undefined>(undefined)

interface IEditProvider {
  children: React.ReactNode
}
enum edit {
  feature = 'feature'
}

type EditContextType = {
  onCreate: (e: { features: DrawFeature[] }) => void
  onUpdate: (e: { features: DrawFeature[] }) => void
  onDelete: (featureId: string) => void
  getFeatureProperty: (featureId: string) => void
  updateFeatureProperties: (
    featureId: NonNullable<string | number | undefined> | undefined,
    properties: object
  ) => void
}

function EditProvider({ children }: IEditProvider) {
  // const initialFeatures = useReadLocalStorage(edit.feature)

  const [features, setFeatures] = useLocalStorage<DrawFeature[]>(
    edit.feature,
    []
  )

  const setFeatureProperties = React.useCallback(
    (feature: DrawFeature, properties: object) => {
      const updatedProperties = { ...feature.properties, ...properties }
      const updatedFeature = { ...feature, properties: updatedProperties }
      return updatedFeature
    },
    []
  )

  // const getCurrentFeatureID = React.useCallback(() => {
  //   let currentSelectedID
  //   setCurrentSelectedFeature((prevFeature) => {
  //     currentSelectedID = prevFeature.id
  //   })
  //   return currentSelectedID
  // }, [setCurrentSelectedFeature])

  const updateFeatureProperties = React.useCallback(
    (
      featureId: NonNullable<string | number | undefined> | undefined,
      properties: object
    ) => {
      if (!featureId || !properties) return
      const feature = features.filter((item) => item.id === featureId)
      if (feature) {
        const updatedFeature = setFeatureProperties(feature[0], properties)
        setFeatures((currentFeatures) =>
          currentFeatures.map((feature) =>
            feature.id === featureId
              ? { ...feature, ...updatedFeature }
              : feature
          )
        )
        // setFeaturePropertiesUpdates({ id: featureId, properties: properties })
        // setCurrentSelectedFeature({ id: featureId, properties: properties })
      } else {
        console.log('feature youre trying to update doesnt exist yet')
      }
    },
    [features, setFeatures, setFeatureProperties]
  )

  const onCreate = React.useCallback(
    (e: { features: DrawFeature[] }) => {
      const newFeature = e.features[0]
      setFeatures((currentFeatures) => [...currentFeatures, newFeature])

      const constructedData = constructFeatureData(newFeature)
      console.log(newFeature)
      mutation.mutate(constructedData)
    },
    [setFeatures]
  )

  const getFeatureProperty = React.useCallback(
    (featureId: string) => {
      const feature = features.filter((item) => item.id === featureId)
      if (feature) {
        return feature[0]?.properties.purpose
        // return feature[0].properties?.purpose
      } else {
        console.log('getFeatureProperty : No Feature with this id')
      }
    },
    [features]
  )

  // HANDLES WHEN A DRAWN FEATURE IS CLICKED/SELECTED OR DESELECTED
  // const onSelectionChange = React.useCallback(
  //   (e: { features: DrawFeature[] }) => {
  //     const selectedFeature = e.features[0]

  //     if (selectedFeature) {
  //       setFeatures((currentFeatures) => {
  //         const selected = currentFeatures.filter(
  //           (item) => item.id === selectedFeature.id
  //         )
  //         const modifiedFeature = {
  //           id: selectedFeature.id,
  //           properties: selected[0].properties
  //         }
  //         setCurrentSelectedFeature(modifiedFeature)
  //         return currentFeatures
  //       })
  //     } else {
  //       setCurrentSelectedFeature(null)
  //       // setFeaturePropertiesUpdates(null)
  //     }
  //   },
  //   [setFeatures]
  // )

  // const onUpdate = React.useCallback(
  //   (e: { features: DrawFeature[] }) => {
  //     const newFeature = e.features[0]
  //     setFeatures((currentFeatures) =>
  //       currentFeatures.map((feature) =>
  //         feature.id === newFeature.id
  //           ? { ...feature, geometry: newFeature.geometry }
  //           : feature
  //       )
  //     )
  //   },
  //   [setFeatures]
  // )

  const onUpdate = React.useCallback(
    (e: { features: DrawFeature[] }) => {
      const newFeature = e.features[0]
      setFeatures((currentFeatures) =>
        currentFeatures.map((feature) =>
          feature.id === newFeature.id
            ? { ...feature, geometry: newFeature.geometry }
            : feature
        )
      )
    },
    [setFeatures]
  )

  const onDelete = React.useCallback(
    (featureID: string) => {
      if (!featureID) return

      setFeatures((currentFeatures) =>
        currentFeatures.filter((feature) => feature.id != featureID)
      )
      // setCurrentSelectedFeature(null)
    },
    [setFeatures]
  )

  // const nonSelected = React.useCallback(() => {
  //   setCurrentSelectedFeature(null)
  // }, [])

  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context

  const value = React.useMemo(
    () => ({
      onCreate,
      onUpdate,
      onDelete,
      getFeatureProperty,
      // features,
      updateFeatureProperties
      // nonSelected
    }),
    [
      onCreate,
      onUpdate,
      onDelete,
      getFeatureProperty,
      // features,
      updateFeatureProperties
    ]
  )

  return <EditContext.Provider value={value}>{children}</EditContext.Provider>
}

function useEdit() {
  const context = React.useContext(EditContext)
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context
}

export { EditProvider, useEdit }

function constructFeatureData(data: DrawFeature) {
  if (!data)
    return console.log('no data from draw control or saveFeature function')

  const constructedData = {
    featureid: data.id,
    geom: data.geometry,
    properties: data.properties,
    created_by: 'noeltech',
    updated_by: 'noeltech'
  }
  return constructedData
}
