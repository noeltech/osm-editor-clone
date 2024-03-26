import { useMutation } from '@tanstack/react-query'
import { useLocalStorage } from 'usehooks-ts'

const mutationKey = { savedFeatures: 'saved-features' }
function useFeatures() {
  const [data, setData] = useLocalStorage(mutationKey.savedFeatures, [])
  return { data, setData }
}

function useAddFeatures() {
  const { setData } = useFeatures()
  return useMutation({
    mutationKey: ['saved-features'],
    mutationFn: (data) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            const { updates, adds, deletes } = data
            setData((prev) => [...prev, ...adds])

            setData((prev) =>
              prev.filter((item) => !deletes.includes(item.featureid))
            )

            updates.map((update) => {
              const { id, type, value } = update.data
              console.log(type)
              setData((prev) => {
                return [...prev].map((item) => {
                  return item.featureid === id
                    ? { ...item, [type]: value }
                    : item
                })
              })
            })

            resolve({ data: 'Operation successful!' })
          } catch (error) {
            reject(new Error('Operation failed!'))
          }
        }, 2000) // 2 seconds delay
      })
    }
  })
}

export { useFeatures, useAddFeatures }
