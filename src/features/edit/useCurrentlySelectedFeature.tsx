import * as React from 'react'
import type { DrawFeature } from '@mapbox/mapbox-gl-draw'

const CurrentSelectedState = React.createContext(null)
const CurrentSelectedAction = React.createContext(undefined)
interface ICurrentSelectedProvider {
  children: React.ReactNode
}
enum edit {
  feature = 'feature'
}

function CurrentSelectedProvider({ children }: ICurrentSelectedProvider) {
  const [currentSelectedFeature, setCurrentSelectedFeature] = React.useState<
    object | null
  >(null)

  const getCurrentFeatureId = React.useCallback(() => {
    let currentSelectedID
    setCurrentSelectedFeature((prevFeature) => {
      currentSelectedID = prevFeature.id
      return prevFeature
    })
    return currentSelectedID
  }, [setCurrentSelectedFeature])

  // HANDLES WHEN A DRAWN FEATURE IS CLICKED/SELECTED OR DESELECTED
  //   const onSelectionChange = React.useCallback(
  //     (e: { features: DrawFeature[] }) => {
  //       const selectedFeature = e.features[0]
  //       if (selectedFeature) {
  //         setCurrentSelectedFeature(selectedFeature.id)
  //       } else {
  //         setCurrentSelectedFeature(null)
  //       }
  //   if (selectedFeature) {
  //     setFeatures((currentFeatures) => {
  //       const selected = currentFeatures.filter(
  //         (item) => item.id === selectedFeature.id
  //       )
  //       const modifiedFeature = {
  //         id: selectedFeature.id,
  //         properties: selected[0].properties
  //       }
  //       setCurrentSelectedFeature(modifiedFeature)
  //       return currentFeatures
  //     })
  //   } else {
  //     setCurrentSelectedFeature(null)
  //     // setFeaturePropertiesUpdates(null)
  //   }
  //     },
  //     []
  //   )

  // const nonSelected = React.useCallback(() => {
  //   setCurrentSelectedFeature(null)
  // }, [])

  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  //   console.log('editprovider render')

  // const action = React.useMemo(
  //   () => ({ setCurrentSelectedFeature }),
  //   [setCurrentSelectedFeature]
  // )

  // const value = { currentSelectedFeature }

  React.useEffect(() => {
    console.log(currentSelectedFeature)
  }, [currentSelectedFeature])
  return (
    <CurrentSelectedState.Provider value={currentSelectedFeature}>
      <CurrentSelectedAction.Provider
        value={{ setCurrentSelectedFeature, getCurrentFeatureId }}
      >
        {children}
      </CurrentSelectedAction.Provider>
    </CurrentSelectedState.Provider>
  )
}

function useCurrentSelectedState() {
  const context = React.useContext(CurrentSelectedState)
  if (context === undefined) {
    throw new Error(
      'useCurrentSelectedState must be used within a CurrentSelectedStateProvider'
    )
  }
  return context
}

function useCurrentSelectedAction() {
  const context = React.useContext(CurrentSelectedAction)
  if (context === undefined) {
    throw new Error(
      'useCurrentSelectedAction must be used within a CurrentSelectedActionProvider'
    )
  }
  return context
}

export {
  CurrentSelectedProvider,
  useCurrentSelectedAction,
  useCurrentSelectedState
}
