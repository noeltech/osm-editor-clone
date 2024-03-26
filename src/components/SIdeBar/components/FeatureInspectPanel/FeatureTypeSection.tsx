import ExpandableSection from '@/components/ui/ExpandableSection'

import { getFeatureButton } from '../FeatureTypeSelectionPanel/components/FeatureTypeList'
import type { DrawFeature } from '@mapbox/mapbox-gl-draw'

export default function FeatureTypeSection({
  selected
}: {
  selected: DrawFeature
}) {
  const { properties } = selected

  const featureTypeButton = getFeatureButton(properties?.featureType)
  return (
    <ExpandableSection label="Feature Type">
      {featureTypeButton}
    </ExpandableSection>
  )
}
