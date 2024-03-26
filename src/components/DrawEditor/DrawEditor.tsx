import { EditHistoryProvider } from '@/utils/edit-history'
import { DrawControlProvider } from '@/utils/useDrawControl'
import { MapProvider, Map } from 'react-map-gl'
import FeatureContextMenu from '../FeatureContextMenu/FeatureContextMenu'
import SideBar from '../SideBar/SideBar'
import {
  MainPanel,
  MapLayoverLayout,
  SidePanel
} from '../MapLayoverLayout/MapLayoverLayout'
import DrawControl from '@/utils/DrawControl'
import { useState } from 'react'

const myMapBoxToken =
  'pk.eyJ1Ijoibm9lbHRlY2giLCJhIjoiY2o2azRiazZ2MTVlZDMxbXdvdTU1OW03YSJ9.eYd9NVbg2cgcrAqs0da8eA'
function DrawEditor() {
  const [contextMenuInfo, setContextMenuInfo] = useState<object | null>(null)

  return (
    <MapProvider>
      <Map
        mapboxAccessToken={myMapBoxToken}
        initialViewState={{
          longitude: 122.562019,
          latitude: 10.720321,
          zoom: 16
          // pitch: 70
        }}
        dragPan={true}
        // mapStyle="mapbox://styles/noeltech/cl3mf1zlh005w15oetwm5zrnx"
        // mapStyle="mapbox://styles/noeltech/cjw1jo13b0eay1dquvzlhq95f"
        mapStyle="mapbox://styles/noeltech/clu1910zi022h01ra8uqw8f81"
        reuseMaps
        // onMouseEnter={(event) => {
        //   if (!event.features.length > 0) return
        //   console.log(event.features[0].id)
        // }}
        // onClick={handleMapClick}
        // interactiveLayerIds={['gl-draw-point-inactive.cold']}
      >
        {/* <Source
      id="buildings_id"
      type="vector"
      url="mapbox://noeltech.4c42q65c"
    >
      <Layer {...layerStyle}></Layer>
    </Source> */}
        <EditHistoryProvider>
          <DrawControlProvider>
            <FeatureContextMenu
              contextMenuInfo={contextMenuInfo}
              onClose={setContextMenuInfo}
            />
            <MapLayoverLayout>
              <SidePanel>
                <SideBar />
              </SidePanel>
              <MainPanel>
                <DrawControl
                  // position="top-left"
                  displayControlsDefault={false}
                  userProperties={true}
                  onContextMenuOpen={setContextMenuInfo}
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
              </MainPanel>
            </MapLayoverLayout>
          </DrawControlProvider>
        </EditHistoryProvider>
      </Map>
    </MapProvider>
  )
}

export default DrawEditor
