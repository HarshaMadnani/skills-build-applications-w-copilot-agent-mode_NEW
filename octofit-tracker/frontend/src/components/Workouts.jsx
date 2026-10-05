import { API_BASE_URL, readCollectionResponse } from '../lib/api.js'
import useCollection from '../hooks/useCollection.js'
import ResourceTable from './ResourceTable.jsx'

async function loadWorkouts(signal) {
  const response = await fetch(`${API_BASE_URL}/api/workouts/`, { signal })
  return readCollectionResponse(response)
}

function Workouts() {
  const { items, loading, error } = useCollection(loadWorkouts)

  return (
    <ResourceTable
      title="Workouts"
      description="Choose a session that fits your goals and energy."
      items={items}
      loading={loading}
      error={error}
      columns={[
        { label: 'Workout', render: (workout) => workout.name ?? 'Unnamed workout' },
        { label: 'Type', render: (workout) => workout.type ?? '—' },
        { label: 'Duration', render: (workout) => workout.duration == null ? '—' : `${workout.duration} min` },
        { label: 'Difficulty', render: (workout) => workout.difficulty ?? '—' },
        { label: 'Description', render: (workout) => workout.description ?? '—' },
      ]}
    />
  )
}

export default Workouts
