import { useCallback } from 'react'
import FeatureInspectPanel from './components/FeatureInspectPanel/FeatureInspectPanel'
import FeatureTypeSelectionPanel from './components/FeatureTypeSelectionPanel/FeatureTypeSelectionPanel'

import SearchFeaturePanel from './components/SearchFeaturePanel/SearchFeaturePanel'

import React from 'react'

import { useDrawControl, useDrawControlAction } from '@/utils/useDrawControl'
import { SlidingPanel } from 'src/components/SideBar/components/SlidingPanel/SlidingPanel'

function SideBar() {
  // const { nonSelected } = useEdit()
  const { selectedFeature, hoveredFeature } = useDrawControl()
  const { setSelectedFeature } = useDrawControlAction()
  const selected = selectedFeature
    ? selectedFeature
    : hoveredFeature
      ? hoveredFeature
      : null
  const handleOnClose = useCallback(() => {
    setSelectedFeature(null)
  }, [setSelectedFeature])

  const toggleView = selected ? true : false

  return (
    <section className="h-full ">
      {!toggleView ? (
        <SearchFeaturePanel />
      ) : (
        <SlidingPanel>
          <FeatureTypeSelectionPanel selected={selected} />
          <FeatureInspectPanel selected={selected} />
        </SlidingPanel>
      )}
    </section>
  )
}

export default React.memo(SideBar)
