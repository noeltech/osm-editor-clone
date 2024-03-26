import React from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import '../../index.css'

import AppBar from '@/components/AppBar/AppBar'
import SavingFeaturesOverlay from '@/components/SavingFeaturesOverlay/SavingFeaturesOverlay'
import DrawEditor from '@/components/DrawEditor/DrawEditor'

function Edit() {
  return (
    <div className="flex h-full flex-col">
      <SavingFeaturesOverlay />
      <AppBar />

      <div className={`flex h-full flex-nowrap overflow-auto`}>
        <div className={`h-full grow`}>
          <DrawEditor />
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
