import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useState } from 'react'
function SearchBar() {
  const [isInputFocused, setIsInputFocused] = useState(false)
  const focusedStyle = 'bg-gray-100'
  return (
    <div
      className={`grow-0 py-2 ${
        isInputFocused && focusedStyle
      } border-t border-gray-300`}
    >
      <form action="">
        <div className="ml-4 flex items-center">
          <Search size={18} strokeWidth={4} />
          <Input
            type="search"
            placeholder="Search"
            className={` rounded-none border-none text-lg font-black ring-0 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 ${
              isInputFocused ? focusedStyle : ''
            }`}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          ></Input>
        </div>
      </form>
    </div>
  )
}
export default SearchBar
