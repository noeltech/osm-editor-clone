import ExpandableSection from '@/components/ui/ExpandableSection'
import { useCurrentSelectedState } from '@/features/edit/useCurrentlySelectedFeature'
import { getFeatureButton } from '../FeatureTypeSelectionPanel/components/FeatureTypeList'

export default function FeatureTypeSection() {
  const { properties } = useCurrentSelectedState()
  const featureType = properties.featureType
    ? properties.featureType
    : 'Generic'
  const featureTypeButton = getFeatureButton(featureType)
  return (
    <ExpandableSection label="Feature Type">
      {featureTypeButton}
    </ExpandableSection>
  )
}
