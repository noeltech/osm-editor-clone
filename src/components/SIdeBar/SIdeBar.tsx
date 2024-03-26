import { useCallback, useEffect, useState } from 'react'
import FeatureInspectPanel from './components/FeatureInspectPanel/FeatureInspectPanel'
import FeatureTypeSelectionPanel from './components/FeatureTypeSelectionPanel/FeatureTypeSelectionPanel'
import { SlidingPanel } from './components/SlidingPanel/SlidingPanel'
import SearchFeaturePanel from './components/SearchFeaturePanel/SearchFeaturePanel'
import { useEdit } from '@/features/edit/useEdit'
import React from 'react'
import {
  useCurrentSelectedAction,
  useCurrentSelectedState
} from '@/features/edit/useCurrentlySelectedFeature'
import { useDrawControl, useDrawControlAction } from '@/utils/useDrawControl'

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
        <SlidingPanel onClose={handleOnClose}>
          <FeatureInspectPanel selected={selected} />
          <FeatureTypeSelectionPanel selected={selected} />
        </SlidingPanel>
      )}
    </section>
  )
}

export default React.memo(SideBar)
