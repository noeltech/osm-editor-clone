import ExpandableSection from '@/components/ui/ExpandableSection'
import {
  Panel,
  PanelHeader,
  PrevPanelButton,
  PanelHeaderTitle,
  CloseButton,
  PanelContent
} from '../SlidingPanel/SlidingPanel'
import FeatureTypeSection from './FeatureTypeSection'
import FieldsSection from './FieldsSection'

function FeatureInspectPanel() {
  return (
    <Panel>
      <PanelHeader>
        <PrevPanelButton />
        <PanelHeaderTitle>Edit Feature</PanelHeaderTitle>
        <CloseButton />
      </PanelHeader>
      <PanelContent>
        <FeatureTypeSection />
        <FieldsSection />
      </PanelContent>
    </Panel>
  )
}

export default FeatureInspectPanel
