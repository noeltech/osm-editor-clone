import SearchBar from '../SearchBar/SearchBar'
import {
  NextPanelButton,
  Panel,
  PanelHeader,
  PanelHeaderTitle,
  PanelContent
} from '../SlidingPanel/SlidingPanel'
import FeatureTypeList from './components/FeatureTypeList'

// type FeatureTypeSelectionPanelProps = {
//   children: JSX.Element | null
// }

export default function FeatureTypeSelectionPanel() {
  return (
    <Panel>
      <PanelHeader>
        <PanelHeaderTitle>Select Feature Type</PanelHeaderTitle>
        <NextPanelButton />
      </PanelHeader>
      <SearchBar />
      <PanelContent>
        <FeatureTypeList></FeatureTypeList>
      </PanelContent>
    </Panel>
  )
}
