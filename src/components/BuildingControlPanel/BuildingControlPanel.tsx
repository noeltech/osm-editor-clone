import React from 'react'

import type {
  FillExtrusionLayer,
  Expression,
  FillExtrusionPaint
} from 'mapbox-gl'

export const layerColors = {
  default: '#c6c5c7',
  residential: '#3dc72e',
  commercial: '#37addb',
  industrial: '#d9d92b',
  services: '#b02bd9'
}

const categoryList = [
  { name: 'All', id: 'All' },
  { name: 'Categorize', id: 'Categorize' },
  { name: 'Residential', id: 'Residential' },
  { name: 'Commercial', id: 'Commercial' },
  { name: 'Industrial', id: 'Industrial' },
  { name: 'Services', id: 'Services' }
]

const initialPaintStyle: FillExtrusionPaint = {
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

const initialLayerStyle: FillExtrusionLayer = {
  id: 'buildings_layer_id',
  type: 'fill-extrusion',
  source: 'buildings_id',
  'source-layer': 'iloilo_city_buildings',
  paint: initialPaintStyle
}

type BuildingControlPanelProps = {
  onChange: React.Dispatch<React.SetStateAction<FillExtrusionLayer>>
}

function BuildingControlPanel({ onChange }: BuildingControlPanelProps) {
  const [activeButton, setActiveButton] = React.useState<number>(0)

  const handleButtonClick = (id: string, index: number) => {
    setActiveButton(index)
    changeBuildingLayerStyle(id)
  }
  const changeBuildingLayerStyle = (id: string) => {
    let newFillColor: Expression | string = ''
    switch (id) {
      case 'All':
        newFillColor = layerColors.default
        break
      case 'Categorize':
        newFillColor = [
          'match',
          ['get', 'landuse'],
          ['Residential'],
          layerColors.residential,
          ['Commercial'],
          layerColors.commercial,
          ['Industrial'],
          layerColors.industrial,
          ['Services'],
          layerColors.services,
          layerColors.default
        ]
        break
      case 'Residential':
        newFillColor = [
          'match',
          ['get', 'landuse'],
          ['Residential'],
          layerColors.residential,
          layerColors.default
        ]
        break
      case 'Commercial':
        newFillColor = [
          'match',
          ['get', 'landuse'],
          ['Commercial'],
          layerColors.commercial,
          layerColors.default
        ]
        break
      case 'Industrial':
        newFillColor = [
          'match',
          ['get', 'landuse'],
          ['Industrial'],
          layerColors.industrial,
          layerColors.default
        ]
        break
      case 'Services':
        newFillColor = [
          'match',
          ['get', 'landuse'],

          ['Services'],
          layerColors.services,
          layerColors.default
        ]
        break
      default:
      // newFillColor = layerColors.default
    }

    const newPaintStyle = {
      ...initialPaintStyle,
      'fill-extrusion-color': newFillColor
    }
    const newLayerStyle = {
      ...initialLayerStyle,
      paint: newPaintStyle
    }

    return onChange(newLayerStyle)
  }
  return (
    <div>
      <ul className="flex gap-2">
        {categoryList.map((item, index) => {
          return (
            <li key={item.name} className="">
              <button
                className="rounded-lg bg-white p-2 disabled:bg-green-600 disabled:text-white"
                id={item.id}
                onClick={() => handleButtonClick(item.id, index)}
                disabled={index === activeButton}
              >
                {item.name}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default BuildingControlPanel
