import { API_BASE_URL, readCollectionResponse } from '../lib/api.js'
import useCollection from '../hooks/useCollection.js'
import ResourceTable from './ResourceTable.jsx'

async function loadTeams(signal) {
  const response = await fetch(`${API_BASE_URL}/api/teams/`, { signal })
  return readCollectionResponse(response)
}

function Teams() {
  const { items, loading, error } = useCollection(loadTeams)

  return (
    <ResourceTable
      title="Teams"
      description="Find your crew and see how your team is doing."
      items={items}
      loading={loading}
      error={error}
      columns={[
        { label: 'Team', render: (team) => team.name ?? 'Unnamed team' },
        {
          label: 'Members',
          render: (team) => Array.isArray(team.members)
            ? team.members.map((member) => member.name ?? member.email ?? 'Member').join(', ')
            : '—',
        },
        { label: 'Points', render: (team) => team.points ?? 0 },
      ]}
    />
  )
}

export default Teams
