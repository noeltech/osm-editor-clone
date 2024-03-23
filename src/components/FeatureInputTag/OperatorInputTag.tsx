import FeatureInputFieldBase from '../ui/FeatureInputFieldBase'

export function OperatorInputTag() {
  return (
    <FeatureInputFieldBase label="Operator">
      <div className="flex">
        <input type="ext" placeholder="Unknwon" className={` grow   p-2`} />
      </div>
    </FeatureInputFieldBase>
  )
}

export default OperatorInputTag
