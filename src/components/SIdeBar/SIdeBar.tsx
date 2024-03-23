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

function SideBar() {
  // const { nonSelected } = useEdit()
  const currentSelectedFeature = useCurrentSelectedState()
  const { setCurrentSelectedFeature } = useCurrentSelectedAction()

  const handleOnClose = useCallback(() => {
    setCurrentSelectedFeature(null)
  }, [setCurrentSelectedFeature])

  const toggleView = currentSelectedFeature ? true : false

  return (
    <section className="h-full ">
      {!toggleView ? (
        <SearchFeaturePanel />
      ) : (
        <SlidingPanel onClose={handleOnClose}>
          <FeatureTypeSelectionPanel />
          <FeatureInspectPanel />
        </SlidingPanel>
      )}
    </section>
  )
}

export default React.memo(SideBar)
