import { Launch } from '@/types/launches'

export async function getLaunches(): Promise<Launch[]> {
  const res = await fetch('https://api.spacexdata.com/v3/launches')
  if (!res.ok) throw new Error('Failed to fetch launches')
  return res.json()
}

export async function getRocketCost(rocket_id: string): Promise<number> {
  const res = await fetch(`https://api.spacexdata.com/v3/rockets/${rocket_id}`)
  if (!res.ok) return 0
  const data = await res.json()
  return data.cost_per_launch || 0
}

export async function updateLaunchCost({
  rocketId: _rocketId,
  cost: _cost,
}: {
  rocketId: string
  cost: number
}): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 5000))
  throw new Error('Failed to update launch cost')
}

export async function updatePayloadType({
  payloadId: _payloadId,
  type: _type,
}: {
  payloadId: string
  type: string
}): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 5000))
  throw new Error('Failed to update payload type')
}
