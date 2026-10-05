import { API_BASE_URL, readCollectionResponse } from '../lib/api.js'
import useCollection from '../hooks/useCollection.js'
import ResourceTable from './ResourceTable.jsx'

async function loadLeaderboard(signal) {
  const response = await fetch(`${API_BASE_URL}/api/leaderboard/`, { signal })
  return readCollectionResponse(response)
}

function Leaderboard() {
  const { items, loading, error } = useCollection(loadLeaderboard)

  return (
    <ResourceTable
      title="Leaderboard"
      description="Celebrate members earning points through their activities."
      items={items}
      loading={loading}
      error={error}
      columns={[
        { label: 'Rank', render: (entry) => `#${entry.rank ?? '—'}` },
        { label: 'Member', render: (entry) => entry.user?.name ?? 'Unknown member' },
        { label: 'Team', render: (entry) => entry.team?.name ?? '—' },
        { label: 'Points', render: (entry) => entry.points ?? 0 },
      ]}
    />
  )
}

export default Leaderboard
