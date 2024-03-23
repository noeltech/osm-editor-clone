interface ITextInputBase {
  placeholder?: string
  className: string
}

function TextInputBase({
  placeholder = 'input',
  className = ''
}: ITextInputBase) {
  return (
    <input
      type="text"
      name=""
      id=""
      placeholder={placeholder}
      className={`w-full text-ellipsis border-r border-gray-300 p-2 ${className}`}
    ></input>
  )
}

export default TextInputBase
