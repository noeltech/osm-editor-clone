import { DrawFeature } from '@mapbox/mapbox-gl-draw'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState
} from 'react'

function newFeaturesReducer(features, action) {
  switch (action.type) {
    case 'add': {
      return [...features, action.newFeature]
    }

    case 'update': {
      const index = features.findIndex((item) => item.id === action.id)

      if (index == -1) {
        console.log('No feature found to be updated')
        return features
      }

      const updatedFeatures = [...features]

      if (action.updateType == 'geometry') {
        updatedFeatures[index] = {
          ...updatedFeatures[index],
          geometry: action.updates
        }

        console.log(action.updates)
        return updatedFeatures
      } else if (action.updateType == 'properties') {
        updatedFeatures[index] = {
          ...updatedFeatures[index],
          properties: {
            ...updatedFeatures[index].properties,
            ...action.updates
          }
        }
      }
      return updatedFeatures
    }
    case 'delete': {
      const currentFeatures = [...features]
      const index = currentFeatures.findIndex((item) => item.id === action.id)

      if (index == -1) {
        console.log('No feature found to be updated')
        return currentFeatures
      }
      currentFeatures.splice(index, 1)
      return currentFeatures
    }
    default: {
      throw Error('Unknown action: ' + action.updateType)
    }
  }
}

const NewFeaturesContext = createContext(null)

const NewFeaturesProvider = ({ children }) => {
  const [features, dispatch] = useReducer(newFeaturesReducer, [])

  const addFeature = useCallback((feature) => {
    dispatch({ type: 'add', newFeature: feature })
  }, [])

  const updateFeature = useCallback((id, updates, updateType) => {
    dispatch({ type: 'update', updateType, updates, id })
  }, [])

  const deleteFeature = useCallback((id) => {
    dispatch({ type: 'delete', id })
  }, [])

  // DEBUGGING
  useEffect(() => {
    console.log(features)
  }, [features])

  const value = {
    addFeature,
    updateFeature,
    deleteFeature
  }
  return (
    <NewFeaturesContext.Provider value={value}>
      {children}
    </NewFeaturesContext.Provider>
  )
}

function useNewFeatures() {
  const context = useContext(NewFeaturesContext)
  if (!context)
    throw new Error('useNewFeatures must be used inside NewFeaturesProvider')
  return context
}

export { useNewFeatures, NewFeaturesProvider }
