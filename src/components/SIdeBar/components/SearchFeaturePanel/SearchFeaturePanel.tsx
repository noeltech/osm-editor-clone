import SearchBar from '../SearchBar/SearchBar'

function SearchfeaturePanel() {
  return (
    <div className="h-full">
      <div className="flex items-center justify-center p-4">
        <h2 className="text-xl font-black text-gray-700">Search features</h2>
      </div>
      <div className="border-y border-gray-400">
        <SearchBar />
      </div>
    </div>
  )
}

export default SearchfeaturePanel
