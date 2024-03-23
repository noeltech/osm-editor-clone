import React, { useCallback, useEffect, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import '../../index.css'
import type { FillExtrusionLayer, MapLayerMouseEvent } from 'react-map-gl'
import Map, { Source, Layer, useMap } from 'react-map-gl'
import BuildingControlPanel from '@/components/BuildingControlPanel/BuildingControlPanel'
import FeatureTypeSelectionPanel from '@/components/SIdeBar/components/FeatureTypeSelectionPanel/FeatureTypeSelectionPanel'
import { layerColors } from '@/components/BuildingControlPanel/BuildingControlPanel'
import DrawControl from '@/utils/DrawControl'
import FeatureTypeList from '@/components/SIdeBar/components/FeatureTypeSelectionPanel/components/FeatureTypeList'
import { useEdit } from '@/features/edit/useEdit'

import AppBar from '@/components/AppBar/AppBar'
import SlidingPanel from '@/components/SIdeBar/components/SlidingPanel/SlidingPanel'
import SearchfeaturePanel from '@/components/SIdeBar/components/SearchFeaturePanel/SearchFeaturePanel'
import SideBar from '@/components/SIdeBar/SIdeBar'
import { CurrentSelectedProvider } from '@/features/edit/useCurrentlySelectedFeature'
import { DrawControlProvider } from '@/utils/useDrawControl'
import { DrawControlUI } from '@/components/DrawControlUI'
import {
  MapLayoverLayout,
  SidePanel,
  MainPanel
} from '@/components/MapLayoverLayout/MapLayoverLayout'
import { NewFeaturesProvider } from '@/utils/temp-feature'

const buildingInitialLayerStyle: FillExtrusionLayer = {
  id: 'buildings_layer_id',
  type: 'fill-extrusion',
  source: 'buildings_id',
  'source-layer': 'iloilo_city_buildings',
  paint: {
    'fill-extrusion-height': [
      'interpolate',
      ['linear'],
      ['get', 'storey'],
      1,
      5,
      11,
      55
    ],
    'fill-extrusion-base': 3,
    'fill-extrusion-color': layerColors.default
  }
}

const myMapBoxToken =
  'pk.eyJ1Ijoibm9lbHRlY2giLCJhIjoiY2o2azRiazZ2MTVlZDMxbXdvdTU1OW03YSJ9.eYd9NVbg2cgcrAqs0da8eA'
function Edit() {
  // const [status, setStatus] = React.useState('idle')
  // const [layerStyle, setLayerStyle] = React.useState(buildingInitialLayerStyle)

  // const [featurePropertiesUpdates, setFeaturePropertiesUpdates] = useState<
  //   object | null
  // >(null)

  // const onFeatureTypeSelect = useCallback(
  //   (properties: object) => {
  //     updateFeatureProperties(currentSelectedFeature?.id, properties)
  //   },
  //   [currentSelectedFeature, updateFeatureProperties]
  // )

  // const handleMapClick = (event: MapLayerMouseEvent) => {
  //   // const feature = event.features && event.features[0]
  //   // if (feature) {
  //   //   console.log(feature)
  //   // }
  //   event.preventDefault()
  // }

  // React.useEffect(() => {
  //   if (features) {
  //     console.log(features)
  //   }
  // }, [features])

  return (
    <div className="flex h-full flex-col">
      <AppBar />
      <div className={`flex h-full flex-nowrap overflow-auto`}>
        <div className={`h-full grow`}>
          <Map
            mapboxAccessToken={myMapBoxToken}
            initialViewState={{
              longitude: 122.562019,
              latitude: 10.720321,
              zoom: 14
              // pitch: 70
            }}
            dragPan={true}
            // mapStyle="mapbox://styles/noeltech/cl3mf1zlh005w15oetwm5zrnx"
            // mapStyle="mapbox://styles/noeltech/cjw1jo13b0eay1dquvzlhq95f"
            mapStyle="mapbox://styles/noeltech/clu1910zi022h01ra8uqw8f81"
            reuseMaps
            // onMouseMove={(event) => {
            //   if (event.features && event.features?.length === 0) return
            //   console.log(event.features)
            // }}
            // onClick={handleMapClick}
            // interactiveLayerIds={[
            //   'inactive_draw_points.cold',
            //   'inactive_draw_points.hot'
            // ]}
          >
            {/* <Source
              id="buildings_id"
              type="vector"
              url="mapbox://noeltech.4c42q65c"
            >
              <Layer {...layerStyle}></Layer>
            </Source> */}
            <CurrentSelectedProvider>
              <DrawControlProvider>
                <NewFeaturesProvider>
                  <MapLayoverLayout>
                    <SidePanel>
                      <SideBar />
                    </SidePanel>
                    <MainPanel>
                      <DrawControl
                        // position="top-left"
                        displayControlsDefault={false}
                        // controls={{
                        //   polygon: true,
                        //   line_string: true,
                        //   trash: true
                        // }}
                        // defaultMode="draw_polygon"
                        // featureTypeUpdates={featurePropertiesUpdates}

                        // onCreate={onCreate}
                        // onUpdate={onUpdate}
                        // onDelete={onDelete}
                        // onSelectionChange={handleSelectionChange}
                      />
                      <DrawControlUI />
                    </MainPanel>
                  </MapLayoverLayout>
                </NewFeaturesProvider>
              </DrawControlProvider>
            </CurrentSelectedProvider>
          </Map>
        </div>
      </div>
      {/* <div className="absolute bottom-4 z-10 w-full">
        <div className="flex justify-center">
          <BuildingControlPanel onChange={setLayerStyle} />
        </div>
      </div> */}
    </div>
  )
}

export default Edit
