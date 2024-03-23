import { DrawFeature } from '@mapbox/mapbox-gl-draw'
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  // useEffect,
  useState
} from 'react'

// Define the context type
type DrawControlContextType = {
  control: MapboxDraw | null
}
type DrawControlActionContextType = {
  setControl: (control: MapboxDraw | null) => void // explicit type for control argument

  setCurrentMode: React.Dispatch<React.SetStateAction<string>>
  setControlMode: (mode: string) => void
  getCurrentSelectedFeature: () => DrawFeature
  getCurrentFeatureProperty: () => object | null
  updateFeatureProperties: (updates: object) => void
}
// Create the context with a default value
const DrawControlContext = createContext<DrawControlContextType | undefined>(
  undefined
)
const DrawControlActionContext = createContext<
  DrawControlActionContextType | undefined
>(undefined)

// Provider component with clear naming
function DrawControlProvider({ children }: { children: ReactNode }) {
  const [control, setControl] = useState<MapboxDraw | null>(null)
  const [currentMode, setCurrentMode] = useState<string>('simple_select')

  const setControlMode = useCallback(
    (mode: string) => {
      setCurrentMode(mode)
      control?.changeMode(mode)
    },
    [control]
  )

  // const setControlDrawFeatures = useCallback(
  //   (DrawFeatures) => {
  //     if (!control) return new Error('No Draw Control is being used')
  //     if (!DrawFeatures) return new Error('Draw Features is null or no value')
  //     control.set(DrawFeatures)
  //   },
  //   [control]
  // )

  const getCurrentFeatureProperty = useCallback(
    (featureId: string) => {
      if (!featureId) return console.log('Provide a feature ID')
      const feature = control?.get(featureId)
      if (!feature) return null
      return feature.properties
    },
    [control]
  )

  const getCurrentSelectedFeatureId = useCallback(() => {
    const featureIDs = control?.getSelectedIds()
    if (featureIDs && featureIDs.length >= 1) {
      return featureIDs[0]
    } else {
      return null
    }
  }, [control])

  const getCurrentSelectedFeature = useCallback(() => {
    const featureCollection = control?.getSelected()
    if (featureCollection && featureCollection.features.length >= 1) {
      return featureCollection.features[0]
    } else {
      return null
    }
  }, [control])

  const updateFeatureProperties = useCallback(
    (updates: object) => {
      const featureId = getCurrentSelectedFeatureId()
      control?.setFeatureProperty(featureId, 'featureType', updates.featureType)
    },
    [control, getCurrentSelectedFeatureId]
  )

  console.log('Control Provider Invoked')
  const value = { control, currentMode }
  const actions = useMemo(
    () => ({
      setControl,
      setCurrentMode,
      setControlMode,
      getCurrentSelectedFeature,
      getCurrentSelectedFeatureId,
      getCurrentFeatureProperty,
      updateFeatureProperties
    }),
    [
      setControl,
      setCurrentMode,
      setControlMode,
      getCurrentSelectedFeature,
      getCurrentSelectedFeatureId,
      getCurrentFeatureProperty,
      updateFeatureProperties
    ]
  )

  return (
    <DrawControlContext.Provider value={value}>
      <DrawControlActionContext.Provider value={actions}>
        {children}
      </DrawControlActionContext.Provider>
    </DrawControlContext.Provider>
  )
}

// Custom hook with type safety
function useDrawControl(): DrawControlContextType {
  const context = useContext(DrawControlContext)

  if (!context) {
    throw new Error('useDrawControl must be used within a DrawControlProvider')
  }

  return context
}

function useDrawControlAction() {
  const context = useContext(DrawControlActionContext)
  if (!context) {
    throw new Error(
      'useDrawControlAction must be used within a DrawControlProvider'
    )
  }
  return context
}

export { DrawControlProvider, useDrawControl, useDrawControlAction }
