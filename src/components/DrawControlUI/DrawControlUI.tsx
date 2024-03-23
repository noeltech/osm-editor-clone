import { MapPin, Waypoints, BoxSelect, PanelLeftClose } from 'lucide-react'
import DrawButton from './DrawButton'
import { useDrawControl } from '@/utils/useDrawControl'
import DeleteFeatureButton from './DeleteFeatureButton'
import InspectButton from './InspectButton'
import SaveButton from './SaveButton'

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

function DrawControlUI() {
  console.log('DrawControl UI invoked')
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
            >
              Point
            </DrawButton>
            <DrawButton
              drawMode={DrawModes.LINE}
              icon={<Waypoints className="mr-2 h-4 w-4" />}
              className="rounded-none border-r border-slate-500"
            >
              Line
            </DrawButton>
            <DrawButton
              drawMode={DrawModes.AREA}
              icon={<BoxSelect className="mr-2 h-4 w-4" />}
              className="rounded-none"
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
          <SaveButton />
          <div className="flex justify-center">
            <span className="py-[2px] text-[11px] text-white">Save</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrawControlUI
