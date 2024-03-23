import { PlusIcon } from 'lucide-react'

import FeatureInputFieldBase from '../ui/FeatureInputFieldBase'
import { useCallback, useState } from 'react'

export function NameInputTag() {
  const [name, setName] = useState('')
  const isDeleteButtonVisible = name && name != '' ? true : false

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { value } = e.target
    setName(value)
  }

  const onDelete = useCallback(() => {
    setName('')
  }, [])

  return (
    <FeatureInputFieldBase
      label="Name"
      inputValue={name}
      onDelete={onDelete}
      isDeleteButtonVisible={isDeleteButtonVisible}
    >
      <div className="flex">
        <input
          type="ext"
          placeholder="Common name (if any)"
          className={` grow border-r border-gray-200 p-2`}
          value={name}
          onChange={onInputChange}
        />
        <button className={`bg-white p-2 text-gray-500`}>
          <PlusIcon size={18} strokeWidth={3} />
        </button>
      </div>
    </FeatureInputFieldBase>
  )
}

export default NameInputTag
