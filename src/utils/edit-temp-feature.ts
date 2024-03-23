import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { client, useAuthClient } from './api-client'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { useDrawControl, useDrawControlAction } from './useDrawControl'
import { useCurrentSelectedAction } from '@/features/edit/useCurrentlySelectedFeature'
import { useAuth } from '@/services/auth'

const useAddFeature = () => {
  const authClient = useAuthClient()
  const setCurrentSelectedFeature = useCurrentSelectedAction()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => authClient('tempfeatureedit', { data }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['temp-feature-edit'] })
      setCurrentSelectedFeature(variables)
    },
    onMutate: (variables) => {},
    onError: () => {
      setCurrentSelectedFeature(null)
    }
  })
  //   const addFeature = mutation.mutate
}

const useFeatures = () => {
  const authClient = useAuthClient()
  const { auth } = useAuth()

  const { data } = useQuery({
    queryKey: ['temp-feature-edit'],
    queryFn: () => authClient(`tempfeatureedit/${auth.id}`).then((data) => data)
    // staleTime: Infinity
  })

  // const getFeature = (id: string) => {
  //   console.log(data)
  //   return data?.find((feature) => feature.featureid === id) ?? null
  // }
  return { data }
}

const useFeature = () => {
  const queryClient = useQueryClient()

  const getFeature = (id: string) => {
    const data = queryClient.getQueryData(['temp-feature-edit'])
    return data?.find((feature) => feature.featureid === id) ?? null
  }
  return getFeature
}

const useUpdateFeature = () => {
  const authClient = useAuthClient()
  const queryClient = useQueryClient()
  const { getCurrentSelectedFeature } = useDrawControlAction()
  const setCurrentSelectedFeature = useCurrentSelectedAction()
  return useMutation({
    mutationFn: async (updates: object) => {
      const feature = getCurrentSelectedFeature()

      // const updatedProperty = {
      //   properties: { ...feature?.properties, ...updates },
      //   updated_by: 'noeltech2'
      // }
      return authClient(`temp-feature-edit-property/${feature?.id}`, {
        method: 'PUT',
        data: updates
      })
    },
    onMutate(updates) {
      // updateFeatureProperties(updates.properties)
      setCurrentSelectedFeature((prev) => ({ ...prev, ...updates }))
    },
    onError(error) {
      console.log(error)
    },
    onSettled() {
      console.log('useUdpatedFeature settled')
      queryClient.invalidateQueries({ queryKey: ['temp-feature-edit'] })
    }
  })
}

// const useUpdateFeatureGoemetry = () => {
//   const queryClient = useQueryClient()
//   const { getCurrentSelectedFeature, updateFeatureProperties } =
//     useDrawControlAction()
//   const setCurrentSelectedFeature = useCurrentSelectedAction()
//   return useMutation({
//     mutationFn: async (updates: object) => {
//       const feature = getCurrentSelectedFeature()

//       const updatedProperty = {
//         properties: { ...feature?.properties, ...updates },
//         updated_by: 'noeltech2'
//       }
//       return client(`temp-feature-edit-property/${feature?.id}`, {
//         method: 'PUT',
//         data: updatedProperty
//       })
//     },
//     onMutate(updates) {
//       updateFeatureProperties(updates)
//       setCurrentSelectedFeature((prev) => {
//         return {
//           ...prev,
//           properties: { ...prev.properties, featureType: updates.featureType }
//         }
//       })
//     },
//     onSettled() {
//       queryClient.invalidateQueries({ queryKey: ['temp-feature-edit'] })
//     }
//   })
// }

// const updateFeatureProperty = async()=> {
//   const feature = getCurrentSelectedFeature()
//   if (!feature) return

//   console.log(updates, feature.id, feature.properties)
//   return updates
// }

// const getFeature = () => {
//   const data = useFeature()
//   return data
// }

const useLoadControlWithFeatures = () => {
  const { auth } = useAuth()
  const authClient = useAuthClient()
  const loadControlWithFeatures = async (drawControl: MapboxDraw) => {
    const result = await authClient(`tempfeatureedit/${auth.id}`)
    if (!drawControl)
      return console.log('Warning : Provide a MapboxDraw Control')
    if (result && result.length != 0) {
      const modifiedWithType = result.map((item) => {
        item.type = 'Feature'

        return {
          type: 'Feature',
          id: item.featureid,
          geometry: item.geom,
          properties: item.properties
        }
      })
      const DrawFeatures = {
        type: 'FeatureCollection',
        features: modifiedWithType
      }
      console.log(drawControl)
      console.log(DrawFeatures)
      drawControl.set(DrawFeatures)
    }
  }
  return loadControlWithFeatures
}
// const  = ()=> {

// }

export {
  useAddFeature,
  useFeatures,
  useLoadControlWithFeatures,
  useUpdateFeature,
  useFeature
}
