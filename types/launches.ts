export interface Launch {
  mission_name: string
  flight_number: number
  launch_date_utc: string
  rocket: {
    rocket_id: string
    second_stage: {
      payloads: {
        payload_id: string
        payload_type: string
      }[]
    }
  }
}

export interface LaunchWithCost {
  mission_name: string
  flight_number: number
  launch_date: string
  satellite_count: number
  time_elapsed: number
  rocket_cost: number
  rocket_id: string
  payload_id: string
  payload_type: string
}

export interface LaunchesQueryData {
  launches: LaunchWithCost[]
  totalCost: number
}
