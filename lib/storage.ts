interface StoredChanges {
  costs: Record<string, number>
  payloadTypes: Record<string, string>
}

const STORAGE_KEY = 'spacexStorage'

export function getStoredChanges(): StoredChanges {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return { costs: {}, payloadTypes: {} }
  return JSON.parse(stored)
}

export function storeChange<K extends keyof StoredChanges>(
  key: K,
  id: string,
  value: StoredChanges[K][string]
): void {
  const stored = getStoredChanges()
  const updatedSection = { ...stored[key], [id]: value }

  const newStored: StoredChanges = {
    ...stored,
    [key]: updatedSection,
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newStored))
}
