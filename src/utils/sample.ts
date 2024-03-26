import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useControl } from 'react-map-gl'
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
import { useSidePanelToggle } from '@/components/MapLayoverLayout/MapLayoverLayout'
import { useEditHistory } from './edit-history'
type DrawFeature = DrawPoint | DrawLineString | DrawPolygon

type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
  position?: ControlPosition
  onCreate?: (evt: { features: DrawFeature[] }) => void
  onUpdate?: (evt: { features: DrawFeature[]; action: string }) => void
  onDelete?: (feattureID: NonNullable<string | number | undefined>) => void
  onChangeMode?: () => void
  onSelectionChange?: (evt: { features: DrawFeature[] }) => {}
}

export default function DrawControl(props: DrawControlProps) {
 
  const drawControlRef = useRef(null)
  const [currentMode, setCurrentMode] = useState('')
  const [newFeatures, setNewFeatures] = useState([])
  const { addHistory, history, clearEditHistory } = useEditHistory()
  const { controlRef } = useDrawControl()



  const handleOnUpdate = 
    (evt: { features: DrawFeature[] }) => {
      const { id, geometry } = evt.features[0]
      console.log(newFeatures)
      // CHECK IF FEATURE IS NEW
      if (!newFeatures.includes(id)) return
      const updates = { geometry, updated_by: 'temp_id' }

      addHistory('update', updates)
      // console.log(updates)
      // updateFeature(feature.id, feature.geometry, 'geometry')
    },
    


  

  const ctrl = useControl<MapboxDraw>(
    () => new MapboxDraw({ styles: drawStyles, ...props }),

    ({ map }) => {
      map.on('draw.create', handleOnCreate)
      map.on('draw.update', handleOnUpdate)
      map.on('draw.selectionchange', handleSelectionChange)
      drawControlRef.current = ctrl
      controlRef.current = ctrl
    },
    ({ map }) => {
      map.off('draw.create', handleOnCreate)
      map.off('draw.update', handleOnUpdate)
      map.off('draw.selectionchange', handleSelectionChange)
      drawControlRef.current = null
    },
    {
      position: props.position
    }
  )



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

  const constructedData = {
    featureid: data.id,
    geom: data.geometry,
    properties: data.properties,
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

    drawControl.set(DrawFeatures)
  }
}
