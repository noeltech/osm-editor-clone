import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useControl, useMap } from 'react-map-gl'
import { DrawControlUI } from '@/components/DrawControlUI'
import type {
  DrawLineString,
  DrawPoint,
  DrawPolygon
} from '@mapbox/mapbox-gl-draw'

import type { ControlPosition } from 'react-map-gl'
// import { useCurrentSelectedAction } from '@/features/edit/useCurrentlySelectedFeature'
import { drawStyles } from './draw-styles'
import { useAddFeatures, useFeatures } from './saved-features'

import { useDrawControl, useDrawControlAction } from './useDrawControl'

import { useEditHistory } from './edit-history'
type DrawFeature = DrawPoint | DrawLineString | DrawPolygon

type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
  position?: ControlPosition
  onCreate?: (evt: { features: DrawFeature[] }) => void
  onUpdate?: (evt: { features: DrawFeature[]; action: string }) => void
  onDelete?: (feattureID: NonNullable<string | number | undefined>) => void
  onChangeMode?: () => void
  onSelectionChange?: (evt: { features: DrawFeature[] }) => {}
  onContextMenuOpen?: React.Dispatch<React.SetStateAction<object | null>>
}

export default function DrawControl(props: DrawControlProps) {
  const { current: map } = useMap()
  const { mutate: uploadChanges } = useAddFeatures()
  const { data } = useFeatures()
  const drawControlRef = useRef(null)
  const [currentMode, setCurrentMode] = useState('')

  const { addHistory, history, clearEditHistory, getHistorybyType } =
    useEditHistory()
  const [counterRunOnce, setCounterRunOnce] = useState(0)
  const { setSelectedFeature, setHoveredFeature } = useDrawControlAction()
  const { controlRef, selectedFeature, hoveredFeature } = useDrawControl()

  const ctrl = useControl<MapboxDraw>(
    () => new MapboxDraw({ styles: drawStyles, ...props }),

    ({ map }) => {
      map.on('draw.create', handleOnCreate)
      map.on('draw.update', handleOnUpdate)
      // map.on('draw.delete', onDelete)
      // map.on('draw.modechange', handleOnDrawModeChange)
      map.on('draw.selectionchange', handleSelectionChange)

      drawControlRef.current = ctrl
      controlRef.current = ctrl
    },
    ({ map }) => {
      map.off('draw.create', handleOnCreate)
      map.off('draw.update', handleOnUpdate)
      // map.off('draw.delete', onDelete)
      // map.off('draw.modechange', handleOnDrawModeChange)
      map.off('draw.selectionchange', handleSelectionChange)
      // setControl(null)
      // ctrl.deleteAll()
      drawControlRef.current = null
    },
    {
      position: props.position
    }
  )

  const handleRightClick = useCallback(
    (e) => {
      console.log(e)
      const { lng, lat } = e.lngLat
      props.onContextMenuOpen && props.onContextMenuOpen({ lng, lat })
    },
    [props]
  )

  const hideHoverEffect = useCallback(() => {
    if (!hoveredFeature) return
    const { id } = hoveredFeature
    ctrl.setFeatureProperty(id, 'hover', 'false')
    ctrl.add(ctrl.get(id))
    setHoveredFeature(null)
  }, [ctrl, setHoveredFeature, hoveredFeature])

  const showHoverEffect = useCallback(
    (e) => {
      if (hoveredFeature || selectedFeature) return
      const { id } = e.features[0].properties
      ctrl.setFeatureProperty(id, 'hover', 'true')
      const feature = ctrl.get(id)
      ctrl.add(feature)

      setHoveredFeature(feature)
    },
    [ctrl, setHoveredFeature, hoveredFeature, selectedFeature]
  )

  const handleSelectionChange = useCallback(
    (event: { features: DrawFeature[] }) => {
      console.log(event)
      const feature = event.features[0]
      // IF NO CURRENT FEATURE IS SELECTED, RETURN AND SET NO CURRENTSELECTED
      if (!feature) setSelectedFeature(null)
      //  SET CURRENT FEATURE OTHERWISE
      setSelectedFeature(feature)
      hideHoverEffect()
    },
    [setSelectedFeature, hideHoverEffect]
  )

  //  Handles Oncreate
  const handleOnCreate = useCallback(
    (evt: { features: DrawFeature[] }) => {
      const { id } = evt.features[0]

      drawControlRef.current?.setFeatureProperty(id, 'featureType', 'Generic')
      drawControlRef.current?.setFeatureProperty(id, 'hover', 'false')

      addHistory('add', { id })
      setCurrentMode('')
    },
    [drawControlRef, addHistory]
  )

  const handleOnUpdate = useCallback(
    (evt: { features: DrawFeature[] }) => {
      const { id, geometry } = evt.features[0]
      const addedHistory = getHistorybyType('add')
      const addedIds = addedHistory.map((item) => item.data.id)

      // CHECK IF FEATURE IS NEW AND DO NOT CREATE HISTORY
      if (addedIds.includes(id)) return
      // OTHERWISE GENERATE A NEW HISTORY
      const updates = {
        updated_by: 'temp_id',
        id,
        type: 'geometry',
        value: geometry
      }
      addHistory('update', updates)
    },
    [addHistory, getHistorybyType]
  )

  // Sets the current draw mode state of the DrawControl Context
  // It is subscribed to the draw control api
  // const handleOnDrawModeChange = useCallback(
  //   (mode: object) => {
  //     const currentMode = mode.mode
  //   },
  //   [setCurrentMode]
  // )

  const changeMode = useCallback(
    (mode) => {
      drawControlRef.current?.changeMode(mode)
      setCurrentMode(mode)
    },
    [drawControlRef]
  )

  console.log('DrawControl is invoked')

  console.log(hoveredFeature)

  const saveFeatures = useCallback(() => {
    const addedHistory = getHistorybyType('add')
    const features = addedHistory
      .map((item) => item.data.id)
      .map((item) => ctrl.get(item))
    const adds = features.map((item) => constructFeatureData(item, 'cocoyID'))
    const updates = getHistorybyType('update')
    const deletedHistory = getHistorybyType('delete')
    const deletes = deletedHistory.map((item) => item.data.id)
    console.log(deletes)
    console.log(adds)
    console.log(updates)
    uploadChanges(
      { adds, updates, deletes },
      {
        onSuccess: () => {
          clearEditHistory()
        }
      }
    )
  }, [ctrl, uploadChanges, clearEditHistory, getHistorybyType])

  useEffect(() => {
    if (!ctrl || data.length == 0) return

    // if (counterRunOnce >= 1)
    console.warn('Must only run once')

    // setCounterRunOnce(1)
    loadControlWithFeatures(ctrl, data)
  }, [ctrl, data])

  useEffect(() => {
    if (!map) return
    map.on('draw.create', handleOnCreate)
    map.on('draw.update', handleOnUpdate)
    // map.on('draw.delete', onDelete)
    // map.on('draw.modechange', handleOnDrawModeChange)
    map.on('draw.selectionchange', handleSelectionChange)
    map.on('mouseenter', 'gl-draw-point-inactive.cold', showHoverEffect)
    map.on(
      'mouseleave',
      'gl-draw-point-stroke-hover-active.hot',
      hideHoverEffect
    )
    map.on('mouseenter', 'gl-draw-point-stroke-inactive.hot', showHoverEffect)

    map.on(
      'contextmenu',
      'gl-draw-point-stroke-hover-active.cold',
      handleRightClick
    )

    return () => {
      map.off('draw.create', handleOnCreate)
      map.off('draw.update', handleOnUpdate)
      // map.off('draw.delete', onDelete)
      // map.off('draw.modechange', handleOnDrawModeChange)
      map.off('draw.selectionchange', handleSelectionChange)
      map.off('mouseenter', 'gl-draw-point-inactive.cold', showHoverEffect)
      map.off(
        'mouseleave',
        'gl-draw-point-stroke-hover-active.hot',
        hideHoverEffect
      )
      map.off(
        'mouseenter',
        'gl-draw-point-stroke-inactive.hot',
        showHoverEffect
      )

      map.off(
        'contextmenu',
        'gl-draw-point-stroke-hover-active.cold',
        handleRightClick
      )
    }
  }, [
    map,
    handleOnCreate,
    handleOnUpdate,
    handleSelectionChange,
    showHoverEffect,
    hideHoverEffect,
    handleRightClick
  ])
  return (
    <DrawControlUI
      changeMode={changeMode}
      currentMode={currentMode}
      save={saveFeatures}
      data={history}
    />
  )
}

function constructFeatureData(data: DrawFeature, userId: string) {
  if (!data)
    return console.log('no data from draw control or saveFeature function')
  const { properties } = data
  delete properties.hover
  const constructedData = {
    featureid: data.id,
    geometry: data.geometry,
    properties: properties,
    created_by: userId,
    updated_by: ''
  }
  return constructedData
}

const loadControlWithFeatures = async (drawControl: MapboxDraw, data) => {
  if (!drawControl) return console.log('Warning : Provide a MapboxDraw Control')

  if (data && data.length != 0) {
    const modifiedWithType = data.map((item) => {
      item.type = 'Feature'
      item.properties.hover = 'false'
      return {
        type: 'Feature',
        id: item.featureid,
        geometry: item.geometry,
        properties: item.properties
      }
    })
    const DrawFeatures = {
      type: 'FeatureCollection',
      features: modifiedWithType
    }

    drawControl.set(DrawFeatures)
  }
}
