import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { useCallback, useEffect } from 'react'
import { useControl } from 'react-map-gl'

import type { DrawFeature } from '@mapbox/mapbox-gl-draw'

import type { ControlPosition } from 'react-map-gl'
import { useReadLocalStorage } from 'usehooks-ts'

import { useCurrentSelectedAction } from '@/features/edit/useCurrentlySelectedFeature'
import { useDrawControlAction } from './useDrawControl'
import {
  useAddFeature,
  useUpdateFeature,
  useFeature,
  useLoadControlWithFeatures
} from './edit-temp-feature'
import { drawStyles } from './draw-styles'
import { useAuth } from '@/services/auth'
import { useNewFeatures } from './temp-feature'

// type fn = (evt: { features: object[] }) => void
type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
  position?: ControlPosition
  onCreate?: (evt: { features: DrawFeature[] }) => void
  // onCreate?: fn[]
  onUpdate?: (evt: { features: DrawFeature[]; action: string }) => void
  onDelete?: (feattureID: NonNullable<string | number | undefined>) => void
  onChangeMode?: () => void
  onSelectionChange?: (evt: { features: DrawFeature[] }) => {}
}

export default function DrawControl(props: DrawControlProps) {
  const loadControlWithFeatures = useLoadControlWithFeatures()

  const { addFeature, updateFeature } = useNewFeatures()
  // const { mutate: updateFeature } = useUpdateFeature()
  // const { mutate: addFeature } = useAddFeature()
  const { setCurrentSelectedFeature } = useCurrentSelectedAction()
  const { setControl, setCurrentMode } = useDrawControlAction()

  const handleSelectionChange = useCallback(
    (event: { features: DrawFeature[] }) => {
      if (event.features[0]) {
        const { properties } = event.features[0]
        const feature = event.features[0]
        if (Object.keys(properties).length === 0) {
          feature.isNew = true
        }
        // // const feature = getFeature(id)
        // // console.log(feature)
        setCurrentSelectedFeature(feature)
      } else {
        setCurrentSelectedFeature(null)
      }
    },
    [setCurrentSelectedFeature]
  )
  //  Handles Oncreate
  const handleOnCreate = useCallback(
    (evt: { features: DrawFeature[] }) => {
      const newFeature = evt.features[0]
      if (!newFeature) return

      // const constructedData = constructFeatureData(newFeature, auth.id)
      // addFeature(constructedData)
      newFeature.isNew = true
      newFeature.properties = { featureType: 'Generic' }
      ctrl.setFeatureProperty(newFeature.id, 'featureType', 'Cafe')
      console.log(ctrl)
      addFeature(newFeature)
    },
    [addFeature]
  )

  const handleOnUpdate = useCallback(
    (evt: { features: DrawFeature[] }) => {
      const feature = evt.features[0]
      if (feature) {
        // const updates = { geom: feature.geometry, updated_by: auth.id }
        // console.log(updates)

        updateFeature(feature.id, feature.geometry, 'geometry')
      }
    },
    [updateFeature]
  )

  // Sets the current draw mode state of the DrawControl Context
  // It is subscribed to the draw control api
  const handleOnDrawModeChange = useCallback(
    (mode: object) => {
      const currentMode = mode.mode
      setCurrentMode(currentMode)
    },
    [setCurrentMode]
  )

  console.log('DrawControl is invoked')

  const ctrl = useControl<MapboxDraw>(
    () => new MapboxDraw({ styles: drawStyles, ...props }),

    ({ map }) => {
      map.on('draw.create', handleOnCreate)
      map.on('draw.update', handleOnUpdate)
      // map.on('draw.delete', onDelete)
      map.on('draw.modechange', handleOnDrawModeChange)
      map.on('draw.selectionchange', handleSelectionChange)
      // map.on('load', function () {
      //   setControl(ctrl)
      //   loadControlWithFeatures(ctrl)
      // })
      // map.on('mousemove', (event) => {
      //   if (event.featureTarget === undefined) return
      //   console.log('hello')
      // })
    },
    ({ map }) => {
      map.off('draw.create', handleOnCreate)
      map.off('draw.update', handleOnUpdate)
      // map.off('draw.delete', onDelete)
      map.off('draw.modechange', handleOnDrawModeChange)
      map.off('draw.selectionchange', handleSelectionChange)
      // setControl(null)
      // ctrl.deleteAll()
    },
    {
      position: props.position
    }
  )

  useEffect(() => {
    setControl(ctrl)
    loadControlWithFeatures(ctrl)
  }, [])

  return null
}

function constructFeatureData(data: DrawFeature, userId: string) {
  if (!data)
    return console.log('no data from draw control or saveFeature function')

  const constructedData = {
    featureid: data.id,
    geom: data.geometry,
    properties: data.properties,
    created_by: userId,
    updated_by: ''
  }
  return constructedData
}
