import { ChevronDownIcon } from 'lucide-react'

interface ITextInputBase {
  placeholder?: string
  className: string
}

function ComboboxInputBase({
  placeholder = 'input',
  className = ''
}: ITextInputBase) {
  return (
    <div className={`flex w-full items-center ${className}`}>
      <input
        type="text"
        name=""
        id=""
        placeholder={placeholder}
        className={`w-full text-ellipsis border-r border-gray-300 p-2 pr-4 `}
      ></input>
      <div className="relative ml-[-30px] w-[30px] cursor-pointer text-gray-500">
        <ChevronDownIcon size={14} />
      </div>
    </div>
  )
}

export default ComboboxInputBase
