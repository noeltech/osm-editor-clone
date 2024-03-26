import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState
} from 'react'
import { nanoid } from 'nanoid'

interface EditHistoryProviderProps {
  children: ReactNode
}
type EditHistoryContextType = {
  history: HistoryProps[] | []
  addHistory: (type: HistoryActionType, data: object) => void
  clearEditHistory: () => void
  getHistorybyType: (type: HistoryActionType) => HistoryProps[]
  removeHistory: (id: string) => void
}

const EditHistoryContext = createContext<EditHistoryContextType | null>(null)

function EditHistoryProvider({ children }: EditHistoryProviderProps) {
  const [history, setHistory] = useState<HistoryProps[] | []>([])

  const addHistory = (type: HistoryActionType, data: object) => {
    const id = nanoid()
    const newHistory = {
      id,
      type,
      data
    }
    setHistory((prev) => [...prev, newHistory])
  }

  const getHistorybyType = useCallback(
    (type: HistoryActionType) => {
      return history.filter((item) => item.type == type)
    },
    [history]
  )

  const removeHistory = useCallback(
    (id: string) => {
      const newHistory = history
      const index = history.findIndex((item) => item.id == id)
      if (index == -1) return
      newHistory.splice(index, 1)
      setHistory(newHistory)
    },
    [history]
  )
  const clearEditHistory = () => {
    setHistory([])
  }
  console.log(history)
  return (
    <EditHistoryContext.Provider
      value={{
        addHistory,
        history,
        clearEditHistory,
        getHistorybyType,
        removeHistory
      }}
    >
      {children}
    </EditHistoryContext.Provider>
  )
}

type HistoryActionType = 'add' | 'update' | 'delete'

interface HistoryProps {
  id: string
  type: HistoryActionType
  data: object
}

function useEditHistory() {
  const context = useContext(EditHistoryContext)
  if (!context)
    throw new Error('useEditHistory must be used within EditHistoryProvider')
  return context
}

export { EditHistoryProvider, useEditHistory }
