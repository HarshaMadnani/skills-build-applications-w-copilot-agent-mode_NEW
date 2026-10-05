import { useEffect, useState } from 'react'

export default function useCollection(loadCollection) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const records = await loadCollection(controller.signal)
        setItems(records)
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError instanceof Error ? requestError.message : 'Unable to load data')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    void load()
    return () => controller.abort()
  }, [loadCollection])

  return { items, loading, error }
}
