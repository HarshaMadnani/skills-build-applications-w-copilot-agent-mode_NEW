export default function ResourceTable({ title, description, columns, items, loading, error }) {
  return (
    <section className="resource-page">
      <div className="page-heading">
        <p className="eyebrow">OCTOFIT TRACKER</p>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>

      {loading && <p className="alert alert-info" role="status">Loading {title.toLowerCase()}...</p>}
      {error && <p className="alert alert-danger" role="alert">{error}</p>}
      {!loading && !error && items.length === 0 && (
        <p className="alert alert-secondary">No {title.toLowerCase()} to show yet.</p>
      )}
      {!loading && !error && items.length > 0 && (
        <div className="table-responsive resource-table-wrap">
          <table className="table table-hover align-middle resource-table">
            <thead>
              <tr>
                {columns.map((column) => <th key={column.label} scope="col">{column.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id ?? item.id ?? index}>
                  {columns.map((column) => (
                    <td key={column.label}>{column.render(item)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
