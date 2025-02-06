export const launchesChannel = new BroadcastChannel('launches')

export interface CostUpdateMessage {
  type: 'COST_UPDATE'
  rocketId: string
  cost: number
}

export interface PayloadUpdateMessage {
  type: 'PAYLOAD_UPDATE'
  payloadId: string
  payloadType: string
}

export type BroadcastMessage = CostUpdateMessage | PayloadUpdateMessage
