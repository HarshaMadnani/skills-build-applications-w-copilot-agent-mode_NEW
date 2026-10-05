import { API_BASE_URL, readCollectionResponse } from '../lib/api.js'
import useCollection from '../hooks/useCollection.js'
import ResourceTable from './ResourceTable.jsx'

async function loadUsers(signal) {
  const response = await fetch(`${API_BASE_URL}/api/users/`, { signal })
  return readCollectionResponse(response)
}

function Users() {
  const { items, loading, error } = useCollection(loadUsers)

  return (
    <ResourceTable
      title="Members"
      description="Meet the people building healthy habits together."
      items={items}
      loading={loading}
      error={error}
      columns={[
        { label: 'Name', render: (user) => user.name ?? 'Unnamed member' },
        { label: 'Email', render: (user) => user.email ?? '—' },
        {
          label: 'Team',
          render: (user) => typeof user.team === 'object' ? user.team?.name ?? '—' : user.team ? 'Joined' : 'No team',
        },
      ]}
    />
  )
}

export default Users
