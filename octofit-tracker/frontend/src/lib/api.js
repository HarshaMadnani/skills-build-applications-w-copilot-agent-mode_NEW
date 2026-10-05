const codespaceName = import.meta.env?.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export async function readCollectionResponse(response) {
  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`)
  }

  const payload = await response.json()
  if (Array.isArray(payload)) {
    return payload
  }
  if (payload && Array.isArray(payload.results)) {
    return payload.results
  }
  if (payload && Array.isArray(payload.data)) {
    return payload.data
  }

  throw new Error('API response must be an array or contain a results or data array')
}
