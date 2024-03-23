import ComboboxInputBase from '../ui/ComboboxInputBase'
import FeatureInputFieldBase from '../ui/FeatureInputFieldBase'
import TextInputBase from '../ui/TextInputBase'

function AddressInputTag() {
  return (
    <FeatureInputFieldBase
      label="Address"
      isDeleteButtonVisible={false}
      onDelete={function (): void {
        throw new Error('Function not implemented.')
      }}
      inputValue={undefined}
    >
      <div className="flex border-b border-gray-300">
        <TextInputBase placeholder="Unit " className="shrink grow basis-1/4" />
        <TextInputBase placeholder="123" className="shrink grow basis-1/4" />
        <ComboboxInputBase
          placeholder="Street"
          className="shrink grow basis-2/4"
        />
      </div>
      <div className="flex border-b border-gray-300">
        <ComboboxInputBase
          placeholder="District"
          className="shrink grow basis-[45%]"
        />
        <ComboboxInputBase
          placeholder="City"
          className="shrink grow basis-[55%]"
        />
      </div>
      <div className="flex">
        <ComboboxInputBase
          placeholder="Postcode"
          className="shrink grow basis-[40%]"
        />
        <ComboboxInputBase
          placeholder="Province"
          className="shrink grow basis-[60%]"
        />
      </div>
    </FeatureInputFieldBase>
  )
}

export default AddressInputTag
