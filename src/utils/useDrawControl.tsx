import MapboxDraw, { DrawFeature } from '@mapbox/mapbox-gl-draw'
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState
  // useEffect,
} from 'react'
import { useEditHistory } from './edit-history'

// Define the context type

// Create the context with a default value
const DrawControlContext = createContext(undefined)
const DrawControlActionContext = createContext(undefined)

// Provider component with clear naming
function DrawControlProvider({ children }: { children: ReactNode }) {
  const { addHistory, getHistorybyType, removeHistory } = useEditHistory()
  const controlRef = useRef<MapboxDraw | null>(null)
  const [selectedFeature, setSelectedFeature] = useState<object | null>(null)
  const [hoveredFeature, setHoveredFeature] = useState<object | null>(null)
  const [newFeatures, setNewFeatures] = useState([])
  const control = controlRef.current
  const getSelected = () => {
    console.log(controlRef.current)
    const { features } = controlRef.current.getSelected()
    return features[0]
  }

  const updateFeature = (id, property, value) => {
    control?.setFeatureProperty(id, property, value)
  }
  const deleteFeature = useCallback(() => {
    if (!selectedFeature) return
    const { id } = selectedFeature
    const addedHistory = getHistorybyType('add')
    const newFeaturesId = addedHistory.map((item) => item.data.id)

    console.log(newFeaturesId)
    // console.log(newFeaturesId)
    if (newFeaturesId.includes(id)) {
      const history = addedHistory.find((item) => item.data.id == id)
      if (!history) return
      removeHistory(history.id)
    } else {
      addHistory('delete', selectedFeature)
    }
    control?.delete(id)
    setSelectedFeature(null)
    setHoveredFeature(null)
  }, [
    selectedFeature,
    control,
    setHoveredFeature,
    setSelectedFeature,
    addHistory,
    getHistorybyType,
    removeHistory
  ])

  console.log(selectedFeature)
  const actions = {
    setSelectedFeature,
    updateFeature,
    setNewFeatures,
    setHoveredFeature,
    deleteFeature
  }
  return (
    <DrawControlContext.Provider
      value={{ controlRef, newFeatures, selectedFeature, hoveredFeature }}
    >
      <DrawControlActionContext.Provider value={actions}>
        {children}
      </DrawControlActionContext.Provider>
    </DrawControlContext.Provider>
  )
}

// Custom hook with type safety
function useDrawControl() {
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
