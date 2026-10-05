import { API_BASE_URL, readCollectionResponse } from '../lib/api.js'
import useCollection from '../hooks/useCollection.js'
import ResourceTable from './ResourceTable.jsx'

async function loadActivities(signal) {
  const response = await fetch(`${API_BASE_URL}/api/activities/`, { signal })
  return readCollectionResponse(response)
}

function Activities() {
  const { items, loading, error } = useCollection(loadActivities)

  return (
    <ResourceTable
      title="Activities"
      description="Recent movement and training logged by the community."
      items={items}
      loading={loading}
      error={error}
      columns={[
        { label: 'Member', render: (activity) => activity.user?.name ?? 'Unknown member' },
        { label: 'Activity', render: (activity) => activity.type ?? '—' },
        { label: 'Duration', render: (activity) => `${activity.duration ?? 0} min` },
        { label: 'Distance', render: (activity) => activity.distance == null ? '—' : `${activity.distance} km` },
        { label: 'Points', render: (activity) => activity.points ?? 0 },
        {
          label: 'Date',
          render: (activity) => activity.date ? new Date(activity.date).toLocaleDateString() : '—',
        },
      ]}
    />
  )
}

export default Activities
