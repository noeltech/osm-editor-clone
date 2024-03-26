import { MapPin, Waypoints, BoxSelect, PanelLeftClose } from 'lucide-react'
import DrawButton from './DrawButton'
import InspectButton from './InspectButton'
import SaveButton from './SaveButton'
import { IControl, MapInstance } from 'react-map-gl'
import { forwardRef, useCallback, useState } from 'react'

enum DrawModes {
  IDLE = 'simple_select',
  POINT = 'draw_point',
  LINE = 'draw_line_string',
  AREA = 'draw_polygon',
  DELETE = 'delete'
}

// interface IDrawControlUI {
//   control: MapboxDraw
// }

function DrawControlUI({ changeMode, currentMode, save, data }) {
  console.log('DrawControl UI invoked')

  const handleChangeMode = useCallback(
    (mode) => {
      changeMode(mode)
    },
    [changeMode]
  )

  const handleSaveFeatures = useCallback(() => {
    save()
  }, [save])

  return (
    <div className="relative top-0 bg-[rgba(0,0,0,.6)] p-3 pb-0">
      <div className="flex justify-center ">
        <div>
          <InspectButton />
          <div className="flex justify-center">
            <span className="py-[2px] text-[11px] text-white">Inspect</span>
          </div>
        </div>
        <div className="grow"></div>
        <div>
          <div className="overflow-hidden rounded-sm">
            <DrawButton
              drawMode={DrawModes.POINT}
              // onClick={}
              icon={<MapPin className="mr-2 h-4 w-4" />}
              className="rounded-none border-r border-slate-500"
              onClick={handleChangeMode}
              currentMode={currentMode}
            >
              Point
            </DrawButton>
            <DrawButton
              drawMode={DrawModes.LINE}
              icon={<Waypoints className="mr-2 h-4 w-4" />}
              className="rounded-none border-r border-slate-500"
              onClick={handleChangeMode}
              currentMode={currentMode}
            >
              Line
            </DrawButton>
            <DrawButton
              drawMode={DrawModes.AREA}
              icon={<BoxSelect className="mr-2 h-4 w-4" />}
              className="rounded-none"
              onClick={handleChangeMode}
              currentMode={currentMode}
            >
              Area
            </DrawButton>
          </div>
          <div className="flex justify-center">
            <span className="py-[2px] text-[11px] text-white">Add Feature</span>
          </div>
        </div>
        <div className="grow"></div>
        <div className="ml-4">
          {/* <DeleteFeatureButton /> */}
          <SaveButton onClick={handleSaveFeatures} data={data} />
          <div className="flex justify-center">
            <span className="py-[2px] text-[11px] text-white">Save</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrawControlUI
