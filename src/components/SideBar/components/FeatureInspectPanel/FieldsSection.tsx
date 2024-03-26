import ExpandableSection from '@/components/ui/ExpandableSection'

import { NameInputTag, OperatorInputTag } from '@/components/FeatureInputTag'
import AddressInputTag from '@/components/FeatureInputTag/AddressInputTag'

export default function FieldsSection() {
  return (
    <ExpandableSection label="Fields">
      <div className="rounded-md bg-gray-200 p-2">
        <NameInputTag />
        <OperatorInputTag />
        <AddressInputTag />
      </div>
    </ExpandableSection>
  )
}
